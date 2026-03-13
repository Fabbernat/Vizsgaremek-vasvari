import db from "./db.js";

db.prepare(`
    CREATE TABLE IF NOT EXISTS meals(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price INTEGER,
    categoryid INTEGER,
    description TEXT,
    restaurantid INTEGER,
    FOREIGN KEY (categoryid) REFERENCES categories(id),
    FOREIGN KEY (restaurantid) REFERENCES restaurants(id)
)
`);

// Add restaurantid column if it doesn't exist
// db.prepare(`ALTER TABLE meals ADD COLUMN restaurantid INTEGER REFERENCES restaurants(id)`).run();

// Get all meals
export const getMeals = () => db.prepare(`SELECT * FROM meals`).all();

// Get meal by id
export const getMealById = (id) =>
  db.prepare(`SELECT * FROM meals WHERE id = ?`).get(id);

// Get meals by restaurant id
export const getMealsByRestaurantId = (restaurantId) =>
  db.prepare(`SELECT * FROM meals WHERE restaurantid = ?`).all(restaurantId);

// Create meal
export const createMeal = (
  name,
  description,
  price,
  categoryid,
  restaurantid,
) =>
  db
    .prepare(
      `INSERT INTO meals (name, description, price, categoryid, restaurantid) VALUES (?, ?, ?, ?, ?)`,
    )
    .run(name, description, price, categoryid, restaurantid);

// Update meal
export const updateMeal = (
  id,
  name,
  description,
  price,
  categoryid,
  restaurantid,
) =>
  db
    .prepare(
      `UPDATE meals SET name = ?, description = ?, price = ?, categoryid = ?, restaurantid = ? WHERE id = ?`,
    )
    .run(name, description, price, categoryid, restaurantid, id);

// Delete meal
export const deleteMeal = (id) =>
  db.prepare(`DELETE FROM meals WHERE id = ?`).run(id);
