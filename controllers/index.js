const { validationResult } = require('express-validator');
const db = require('../db/queries');
const bcrypt = require('bcrypt');
const passport = require('passport');

const getIndex = (req, res) => {
  res.render('index');
};

const getSignUpForm = (req, res) => {
  res.render('sign-up-form');
};

const getLoginForm = (req, res) => {
  res.render('login-form');
};

const getLoginFailure = (req, res) => {
  res.render('login-failure');
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
  getIndex,
  getSignUpForm,
  getLoginForm,
  postSignUpForm,
  postLoginForm,
};
