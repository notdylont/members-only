const { Router } = require('express');
const controller = require('../controllers/index');
const router = Router();
const { body, validationResult } = require('express-validator');
const isLoggedIn = require('../middleware/isLoggedIn');
const isAdmin = require('../middleware/isAdmin');

router.get('/', controller.getIndex);
router.get('/sign-up', controller.getSignUpForm);
router.get('/login', controller.getLoginForm);
router.get('/membership', isLoggedIn, controller.getMemberForm);
router.get('/logout', controller.logout);
router.get('/new-msg', controller.getNewMsgForm);
router.get('/admin', isLoggedIn, controller.getAdminForm);

router.post('/membership', isLoggedIn, controller.postMemberForm);
router.post('/login', controller.postLoginForm);
router.post('/new-msg', controller.postNewMsgForm);
router.post('/admin', controller.postAdminForm);
router.post(
  '/messages/:id/delete',
  isLoggedIn,
  isAdmin,
  controller.postDeleteMessage,
);
router.post(
  '/sign-up',
  // validate sign up
  [
    body('first_name')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('First name is required'),
    body('last_name')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Last name is required'),
    body('username')
      .trim()
      .escape()
      .notEmpty()
      .withMessage('Username is required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    body('confirm_password').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords must match');
      }
      return true;
    }),
  ],
  controller.postSignUpForm,
);

module.exports = router;
