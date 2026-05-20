const { Pool } = require('pg');
require('dotenv').config();

const { HOST, DATABASE, USER, PASSWORD } = process.env;

module.exports = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
