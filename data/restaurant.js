import db from "./db.js";

db.prepare(`
    CREATE TABLE IF NOT EXISTS restaurants(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    ownerid INTEGER,
    FOREIGN KEY(ownerid) REFERENCE owners(id)
    )
`);

// Get all restaurants
export const getRestaurants = () =>
  db.prepare(`SELECT * FROM restaurants`).all();

// Get restaurant by id
export const getRestaurantById = (id) =>
  db.prepare(`SELECT * FROM restaurants WHERE id = ?`).get(id);

// Create restaurant
export const createRestaurant = (name, ownerid) =>
  db
    .prepare(`INSERT INTO restaurants name, ownerid VALUES (?, ?)`)
    .run(name, ownerid);

// Update restaurant
export const updateRestaurant = (id, name, ownerid) =>
  db
    .prepare(`UPDATE restaurants SET (name = ?, ownerid = ?) WHERE id = ?`)
    .run(name, ownerid, id);

// Delete restaurant
export const deleteRestaurant = (id) =>
  db.prepare(`DELETE FROM restaurants WHERE id = ?`).run(id);
