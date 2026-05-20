const { Pool } = require('pg');
require('dotenv').config();

const { HOST, DATABASE, USER, PASSWORD } = process.env;

module.exports = new Pool({
  host: HOST,
  database: DATABASE,
  user: USER,
  password: PASSWORD,
  port: 5432,
  ssl: {
    require: true,
  },
});
