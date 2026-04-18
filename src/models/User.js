const pool = require('../config/database');

async function findById(id) {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0];
}

async function findByUsername(username) {
  const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return rows[0];
}

async function create({ firstName, lastName, username, password }) {
  const { rows } = await pool.query(
    `INSERT INTO users (first_name, last_name, username, password)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [firstName, lastName, username, password],
  );
  return rows[0];
}

async function setMembership(id) {
  const { rows } = await pool.query('UPDATE users SET is_member = true WHERE id = $1 RETURNING *', [
    id,
  ]);
  return rows[0];
}

module.exports = { findById, findByUsername, create, setMembership };
