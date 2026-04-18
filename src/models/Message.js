const pool = require('../config/database');

async function findAll() {
  const { rows } = await pool.query(
    `SELECT messages.*, users.username,users.first_name, users.last_name
     FROM messages
     JOIN users ON messages.user_id = users.id
     ORDER BY messages.created_at DESC`,
  );

  return rows;
}
async function findById(id) {
  const { rows } = await pool.query(
    `Select * From messages
     WHERE message.id=$1`,
    [id],
  );
  return rows[0];
}
async function create({ title, text, userId }) {
  const { rows } = await pool.query(
    `INSERT INTO messages (title, text, user_id)
     VALUES ($1, $2, $3) RETURNING *`,
    [title, text, userId],
  );
  return rows[0];
}

async function deleteById(id) {
  const { rows } = await pool.query('DELETE FROM messages WHERE id = $1 RETURNING *', [id]);
  return rows[0];
}

module.exports = { findAll, findById, create, deleteById };
