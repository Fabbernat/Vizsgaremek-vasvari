import db from "./db.js";

db.prepare(`
    CREATE TABLE IF NOT EXISTS meals(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price INTEGER,
    categoryid INTEGER,
    type TEXT,
    FOREIGN KEY (categoryid) REFERENCES categories(id)
)
`);

// Get all meals
export const getMeals = () => db.prepare(`SELECT * FROM meals`).all();

// Get meal by id
export const getMealById = (id) =>
  db.prepare(`SELECT * FROM meals WHERE id = ?`).get(id);

// Create meal
export const createMeal = (name, price, categoryid, type) =>
  db
    .prepare(`INSERT INTO meals name,price,categoryid,type VALUES(?,?,?,?)`)
    .run(name, price, categoryid, type);

// Update meal
export const updateMeal = (id, name, price, categoryid, type) =>
  db
    .prepare(
      `UPDATE meals SET (name = ?, price = ?, categoryid = ?, type = ?) WHERE id = ?`,
    )
    .run(name, price, categoryid, type, id);

// Delete meal
export const deleteMeal = (id) =>
  db.prepare(`DELETE FROM meals WHERE id = ?`).run(id);
