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
  res.render('index', { user: req.user, messages: messages });
};

const getSignUpForm = (req, res) => {
  res.render('sign-up-form');
};

const getLoginForm = (req, res) => {
  res.render('login-form');
};

const getMemberForm = (req, res) => {
  res.render('member-form', { user: req.user });
};

const getNewMsgForm = (req, res) => {
  res.render('new-msg-form', { user: req.user });
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
      res
        .status(401)
        .render('member-form', { error: 'Wrong password', user: req.user });
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
  postMemberForm,
  postSignUpForm,
  postLoginForm,
  postNewMsgForm,
};
