import db from "./db.js";
import { deleteMealsByRestaurantId } from "./mealData.js";

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS restaurants(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    ownerid INTEGER,
    FOREIGN KEY (ownerid) REFERENCES owners(id) ON DELETE SET NULL
    )
`,
).run();

// Get all restaurants
export const getRestaurants = () =>
  db.prepare(`SELECT * FROM restaurants`).all();

// Get restaurant by id
export const getRestaurantById = (id) =>
  db.prepare(`SELECT * FROM restaurants WHERE id = ?`).get(id);

// Create restaurant
export const createRestaurant = (name, description) =>
  db
    .prepare(`INSERT INTO restaurants (name, description) VALUES (?, ?)`)
    .run(name, description);

// Update restaurant
export const updateRestaurant = (id, name, description) =>
  db
    .prepare(`UPDATE restaurants SET name = ?, description = ? WHERE id = ?`)
    .run(name, description, id);

// Delete restaurant
export const deleteRestaurant = (id) => {
  deleteMealsByRestaurantId(id);
  return db.prepare(`DELETE FROM restaurants WHERE id = ?`).run(id);
};
