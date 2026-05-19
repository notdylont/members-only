const path = require('node:path');
const express = require('express');
const router = require('./routes/index');
const bcrypt = require('bcrypt');
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);
const pool = require('./db/pool');
const passport = require('passport');

require('./config/passport');
require('dotenv').config();

const app = express();
const assetsPath = path.join(__dirname, 'public');
const { PORT = 3000 } = process.env;

app.use(express.static(assetsPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  expressSession({
    store: new pgSession({
      pool: pool,
      tableName: 'session',
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
