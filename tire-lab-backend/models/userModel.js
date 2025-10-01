// models/userModel.js
import pool from '../db.js';

export async function createUser({ name, email, password, mobile, position, image }) {
  const result = await pool.query(
    `INSERT INTO users (name, email, password, mobile, position, image)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING id, name, email, mobile, position, image, created_at`,
    [name, email, password, mobile, position, image]  
  );
  return result.rows[0];
}


export async function findUserByEmail(email) {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];
}

export async function findUserById(id) {
  const result = await pool.query('SELECT id, name, email, mobile, position, image FROM users WHERE id = $1', [id]);
  return result.rows[0];
}

export async function updateUser(id, { name, email, mobile, position, image }) {
  const result = await pool.query(
    `UPDATE users SET
      name = $1,
      email = $2,
      mobile = $3,
      position = $4,
      image = $5
     WHERE id = $6
     RETURNING id, name, email, mobile, position, image`,
    [name, email, mobile, position, image, id]
  );
  return result.rows[0];
}

