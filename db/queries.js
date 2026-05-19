const pool = require('./pool');

const getAllUsers = async () => {
  const { rows } = await pool.query(`SELECT * FROM users`);
  return rows;
};

const findUser = async (username) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE username = $1`, [
    username,
  ]);
  return rows[0];
};

const findUserById = async (id) => {
  const { rows } = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return rows[0];
};

const insertUser = async (firstName, lastName, username, password) => {
  await pool.query(
    `INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)`,
    [firstName, lastName, username, password],
  );
};

module.exports = {
  getAllUsers,
  findUser,
  findUserById,
  insertUser,
};
