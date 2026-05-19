const { validationResult } = require('express-validator');
const db = require('../db/queries');
const bcrypt = require('bcrypt');

const getIndex = (req, res) => {
  res.render('index');
};

const getSignUpForm = (req, res) => {
  res.render('sign-up-form');
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

const getLoginForm = (req, res) => {
  res.render('login');
};

module.exports = {
  getIndex,
  getSignUpForm,
  postSignUpForm,
  getLoginForm,
};
