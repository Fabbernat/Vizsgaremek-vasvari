import db from "./db.js";

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    email TEXT,
    password TEXT
    )
`
).run();

// Get all users
export const getUsers = () => db.prepare(`SELECT * FROM users`).all();

// Get user by id
export const getUserById = (id) =>
  db.prepare(`SELECT * FROM users WHERE id=?`).get(id);

// Create user
export const createUser = (username, email, password) =>
  db
    .prepare(`INSERT INTO users(username, email, password) VALUES (?, ?, ?)`)
    .run(username, email, password);

// Update user
export const editUser = (id, username, email, password) =>
  db
    .prepare(
      `UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?`
    )
    .run(username, email, password, id);

// Delete user
export const deleteUser = (id) =>
  db.prepare(`DELETE FROM users WHERE id =?`).run(id);
