import db from "./db";

db.prepare(
  `
    CREATE IF NOT EXISTS owners(
    id INTEGER PRIMARY KEY AUTOINCREMENT
    username STRING
    email STRING
    password STRING
    FOREIGN KEY(username) REFERENCES restaurants(ownerid)
    )
`
).run();

// Get all owners
export const getOwners = () => db.prepare(`SELECT * FROM owners`).all();

// Get owner by id
export const getOwnerById = (id) =>
  db.prepare(`SELECT * FROM owners WHERE id=?`).get(id);

// Create owner
export const createOwner = (username, email, password) =>
  db
    .prepare(`INSERT INTO owners(username, email, password) VALUES (?, ?, ?)`)
    .run(username, email, password);

// Update owner
export const editOwner = (id, username, email, password) =>
  db
    .prepare(
      `UPDATE owners SET (username = ?, email = ?, password = ?) WHERE id = ?`
    )
    .run(username, email, password, id);

// Delete owner
export const deleteOwner = (id) =>
  db.prepare(`DELETE FROM owners WHERE id =?`).run(id);
