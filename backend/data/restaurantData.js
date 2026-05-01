import db from "./db.js";
import { deleteMealsByRestaurantId } from "./mealData.js";

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS restaurants(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    FOREIGN KEY (ownerid) REFERENCES owners(id) ON DELETE SET NULL
    )
`,
).run();

// Get all restaurants with a single image URL if available
export const getRestaurants = () =>
  db
    .prepare(
      `SELECT
        r.*,
        (
          SELECT image_url
          FROM restaurant_images i
          WHERE i.restaurant_id = r.id
          ORDER BY i.sort_order ASC, i.id DESC
          LIMIT 1
        ) AS imageurl
      FROM restaurants r`,
    )
    .all();

// Get restaurant by id with image URL
export const getRestaurantById = (id) =>
  db
    .prepare(
      `SELECT
        r.*,
        (
          SELECT image_url
          FROM restaurant_images i
          WHERE i.restaurant_id = r.id
          ORDER BY i.sort_order ASC, i.id DESC
          LIMIT 1
        ) AS imageurl
      FROM restaurants r
      WHERE r.id = ?`,
    )
    .get(id);

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
