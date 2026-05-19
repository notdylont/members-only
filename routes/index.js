const { Router } = require('express');
const controller = require('../controllers/index');
const router = Router();

router.get('/', controller.getIndex);
router.get('/sign-up', controller.getSignUpForm);

module.exports = router;
