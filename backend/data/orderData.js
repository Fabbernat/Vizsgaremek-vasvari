import db from "./db.js";

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS orders(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    restaurantid INTEGER,
    userid INTEGER,
    date TEXT,
    FOREIGN KEY(restaurantid) REFERENCES restaurants(id),
    FOREIGN KEY(userid) REFERENCES users(id)
    )    
`,
).run();

// Get all orders
export const getOrders = () => db.prepare(`SELECT * FROM orders`).all();

// Get order by id
export const getOrdersById = (id) =>
  db.prepare(`SELECT * FROM orders WHERE id = ?`).get(id);

// Create order
export const createOrder = (restaurantid, userid, date) =>
  db
    .prepare(`INSERT INTO orders restaurantid, userid, date VALUES(?,?,?)`)
    .run(restaurantid, userid, date);

// Update order
export const updateOrder = (id, restaurantid, userid, date) =>
  db
    .prepare(
      `UPDATE orders SET (restaurantid = ?, userid = ?, date = ?) WHERE id = ?`,
    )
    .run(restaurantid, userid, date, id);

// Delete order
export const deleteOrder = (id) =>
  db.prepare(`DELETE FROM orders WHERE id = ?`).run(id);
