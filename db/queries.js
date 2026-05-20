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

const addMembership = async (id) => {
  await pool.query(`UPDATE users SET is_member = true WHERE id = $1`, [id]);
};

const addAdmin = async (id) => {
  await pool.query(`UPDATE users SET is_admin = true WHERE id = $1`, [id]);
};

const insertMessage = async (title, message, userId) => {
  await pool.query(
    `INSERT INTO messages (title, text, user_id) VALUES ($1, $2, $3)`,
    [title, message, userId],
  );
};

const getAllMessages = async () => {
  const { rows } = await pool.query(
    `SELECT messages.*, users.username, users.first_name, users.last_name FROM messages JOIN users ON messages.user_id = users.id ORDER BY messages.created_at DESC`,
  );
  return rows;
};

const deleteMessage = async (id) => {
  pool.query(`DELETE FROM messages WHERE id = $1`, [id]);
};
module.exports = {
  getAllUsers,
  findUser,
  findUserById,
  insertUser,
  addMembership,
  insertMessage,
  getAllMessages,
  addAdmin,
  deleteMessage,
};
