const { validationResult } = require('express-validator');
const db = require('../db/queries');
const bcrypt = require('bcrypt');
const passport = require('passport');

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
};

const getIndex = async (req, res) => {
  const messages = await db.getAllMessages();
  res.render('index', { messages: messages });
};

const getSignUpForm = (req, res) => {
  res.render('sign-up-form');
};

const getLoginForm = (req, res) => {
  res.render('login-form');
};

const getMemberForm = (req, res) => {
  res.render('member-form');
};

const getNewMsgForm = (req, res) => {
  res.render('new-msg-form');
};

const getAdminForm = (req, res) => {
  if (req.user.is_admin) return res.redirect('/');
  res.render('admin-form');
};

const postAdminForm = async (req, res, next) => {
  try {
    const { admin_key } = req.body;
    if (admin_key === process.env.ADMIN_KEY) {
      await db.addAdmin(req.user.id);
      res.redirect('/');
    } else {
      res.status(401).render('admin-form', { error: 'Wrong key' });
    }
  } catch (err) {
    next(err);
  }
};

const postDeleteMessage = async (req, res, next) => {
  try {
    await db.deleteMessage(req.params.id);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};

const postNewMsgForm = async (req, res, next) => {
  try {
    const { title, message } = req.body;
    await db.insertMessage(title, message, req.user.id);
    return res.redirect('/');
  } catch (err) {
    next(err);
  }
};

const postMemberForm = async (req, res, next) => {
  try {
    const { member_password } = req.body;
    if (member_password === process.env.MEMBER_KEY) {
      await db.addMembership(req.user.id);
      res.redirect('/');
    } else {
      res.status(401).render('member-form', { error: 'Wrong password' });
    }
  } catch (err) {
    next(err);
  }
};

const postSignUpForm = async (req, res, next) => {
  try {
    const { first_name, last_name, username, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('sign-up-form', {
        errors: errors.array(),
        first_name,
        last_name,
        username,
      });
    }
    const hash = await bcrypt.hash(password, 10);
    await db.insertUser(first_name, last_name, username, hash);
    res.redirect('/login');
  } catch (err) {
    next(err);
  }
};

const postLoginForm = (req, res, next) => {
  passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
  })(req, res, next);
};

module.exports = {
  logout,
  getIndex,
  getSignUpForm,
  getLoginForm,
  getMemberForm,
  getNewMsgForm,
  getAdminForm,
  postMemberForm,
  postSignUpForm,
  postLoginForm,
  postNewMsgForm,
  postAdminForm,
  postDeleteMessage,
};
