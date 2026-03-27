import db from "./db.js";

db.prepare(`
    CREATE TABLE IF NOT EXISTS categories(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    restaurantid INTEGER
    )    
`);

// Get all categories
export const getCategories = () => db.prepare(`SELECT * FROM categories`).all();

// Get category by id
export const getCategoryById = (id) =>
  db.prepare(`SELECT * FROM categories WHERE id = ?`).get(id);

// Create category
export const addCategory = (name, restaurantid) =>
  db
    .prepare(`INSERT INTO categories (name, restaurantid) VALUES(?,?)`)
    .run(name, restaurantid);

// Update category
export const updateCategory = (id, name, restaurantid) =>
  db
    .prepare(`UPDATE categories SET(name = ?, restaurantid = ?) WHERE id = ?`)
    .run(name, restaurantid, id);

// Delete category
export const deleteCategory = (id) =>
  db.prepare(`DELETE FROM categories WHERE id = ?`).run(id);
