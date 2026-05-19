const db = require('../db/queries');
const bcrypt = require('bcrypt');

const getIndex = (req, res) => {
  res.render('index');
};

const getSignUpForm = (req, res) => {
  res.render('sign-up-form');
};

const postSignUpForm = async (req, res, next) => {};

module.exports = {
  getIndex,
  getSignUpForm,
};
