const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const db = require('../db/queries');

const customFields = {
  usernameField: 'username',
  passwordField: 'password',
};

const verifyCallback = async (username, password, done) => {
  try {
    const user = await db.findUser(username);

    if (!user) return done(null, false);

    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    done(err);
  }
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await db.findUserById(userId);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
