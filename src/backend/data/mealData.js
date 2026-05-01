import db from "./db.js";

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS meals(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price INTEGER,
    description TEXT,
    restaurantid INTEGER,
    available INTEGER DEFAULT 1,
    FOREIGN KEY (restaurantid) REFERENCES restaurants(id) ON DELETE CASCADE
)
`,
).run();

// Delete meals by restaurant id (used before deleting restaurant)
export const deleteMealsByRestaurantId = (restaurantId) =>
  db.prepare(`DELETE FROM meals WHERE restaurantid = ?`).run(restaurantId);

// Get all meals
export const getMeals = () =>
  db
    .prepare(
      `SELECT id, name, price, description, restaurantid, available,
       CASE WHEN available = 1 THEN 'Elérhető' ELSE 'Nem elérhető' END AS status
       FROM meals`,
    )
    .all();

// Get meal by id
export const getMealById = (id) =>
  db
    .prepare(
      `SELECT id, name, price, description, restaurantid, available,
       CASE WHEN available = 1 THEN 'Elérhető' ELSE 'Nem elérhető' END AS status
       FROM meals WHERE id = ?`,
    )
    .get(id);

// Get meals by restaurant id
export const getMealsByRestaurantId = (restaurantId) =>
  db
    .prepare(
      `SELECT id, name, price, description, restaurantid, available,
       CASE WHEN available = 1 THEN 'Elérhető' ELSE 'Nem elérhető' END AS status
       FROM meals WHERE restaurantid = ?`,
    )
    .all(restaurantId);

// Create meal
export const createMeal = (
  name,
  description,
  price,
  restaurantid,
  available = 1,
) =>
  db
    .prepare(
      `INSERT INTO meals (name, description, price, restaurantid, available) VALUES (?, ?, ?, ?, ?)`,
    )
    .run(name, description, price, restaurantid, available);

// Update meal
export const updateMeal = (
  id,
  name,
  description,
  price,
  restaurantid,
  available = 1,
) =>
  db
    .prepare(
      `UPDATE meals SET name = ?, description = ?, price = ?, restaurantid = ?, available = ? WHERE id = ?`,
    )
    .run(name, description, price, restaurantid, available, id);

// Delete meal
export const deleteMeal = (id) =>
  db.prepare(`DELETE FROM meals WHERE id = ?`).run(id);
