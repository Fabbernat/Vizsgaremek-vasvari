import db from "./db.js";

db.prepare(`
    CREATE TABLE IF NOT EXISTS orderitems(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    mealid INTEGER,
    orderid INTEGER,
    amount INTEGER,
    FOREIGN KEY(mealid) REFERENCES meals(id)
    FOREIGN KEY(orderid) REFERENCES order(id)
    )
`);

// Get all order items
export const getOrderItems = () => db.prepare(`SELECT * FROM orderitems`).all();

// Get order item by id
export const getOrderItemsById = (id) =>
  db.prepare(`SELECT * FROM orderitems WHERE id = ?`).get(id);

// Create order item
export const createOrderItem = (mealid, orderid, amount) =>
  db
    .prepare(
      `INSERT INTO orderitems (mealid, orderid, amount) VALUES (?, ?, ?)`,
    )
    .run(mealid, orderid, amount);

// Update order item
export const updateOrderItem = (id, mealid, orderid, amount) =>
  db
    .prepare(
      `UPDATE orderitems SET mealid = ?, orderid = ?, amount = ? WHERE id = ?`,
    )
    .run(mealid, orderid, amount, id);

// Delete order item
export const deleteOrderItem = (id) =>
  db.prepare(`DELETE FROM orderitems WHERE id = ?`).run(id);
