const db = require('../db/queries');

const getIndex = (req, res) => {
  res.render('index');
};

const getSignUpForm = (req, res) => {
  res.render('sign-up-form');
};

module.exports = {
  getIndex,
  getSignUpForm,
};
