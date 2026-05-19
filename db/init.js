// For initializing tables in the db

const pool = require('./pool');

pool
  .query(
    `
    CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    is_member BOOLEAN DEFAULT false
    );

    CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    user_id INT REFERENCES users(id) ON DELETE CASCADE
    )
    `,
  )
  .catch((err) => console.error(err));
