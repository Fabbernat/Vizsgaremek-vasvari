import db from "./db.js";

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    firstName TEXT,
    lastName TEXT,
    email TEXT,
    password TEXT,
    address TEXT
    )
`,
).run();

// Get all users
export const getUsers = () => db.prepare(`SELECT * FROM users`).all();

// Get user by id
export const getUserById = (id) =>
  db.prepare(`SELECT * FROM users WHERE id=?`).get(id);

// Create user
export const createUser = (
  username,
  firstName,
  lastName,
  email,
  password,
  address,
) =>
  db
    .prepare(
      `INSERT INTO users(username, firstName, lastName, email, password, address) VALUES (?, ?, ?, ?, ?, ?)`,
    )
    .run(username, firstName, lastName, email, password, address);

// Update user
export const updateUser = (
  id,
  username,
  firstName,
  lastName,
  email,
  password,
  address,
) =>
  db
    .prepare(
      `UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?`,
    )
    .run(username, firstName, lastName, email, password, address, id);

// Delete user
export const deleteUser = (id) =>
  db.prepare(`DELETE FROM users WHERE id =?`).run(id);
