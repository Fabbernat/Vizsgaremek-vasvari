import db from "./db.js";

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS orders(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    restaurantid INTEGER,
    userid INTEGER,
    date TEXT,
    orderedmeal TEXT,
    payment REAL,
    status TEXT DEFAULT 'pending',
    FOREIGN KEY(restaurantid) REFERENCES restaurants(id),
    FOREIGN KEY(userid) REFERENCES users(id)
    )    
`,
).run();

// Add status column if it doesn't exist
try {
  db.prepare(
    `ALTER TABLE orders ADD COLUMN status TEXT DEFAULT 'pending'`,
  ).run();
} catch (e) {
  // Column already exists
}

// Get all orders
export const getOrders = () => db.prepare(`SELECT * FROM orders`).all();

// Get order by id
export const getOrdersById = (id) =>
  db.prepare(`SELECT * FROM orders WHERE id = ?`).get(id);

// Create order
export const createOrder = (restaurantid, userid, date, orderedmeal, payment) =>
  db
    .prepare(
      `INSERT INTO orders (restaurantid, userid, date, orderedmeal, payment) VALUES(?,?,?,?,?)`,
    )
    .run(restaurantid, userid, date, JSON.stringify(orderedmeal), payment);

// Update order
export const updateOrder = (
  id,
  restaurantid,
  userid,
  date,
  orderedmeal,
  payment,
) =>
  db
    .prepare(
      `UPDATE orders SET restaurantid = ?, userid = ?, date = ?, orderedmeal = ?, payment = ? WHERE id = ?`,
    )
    .run(restaurantid, userid, date, JSON.stringify(orderedmeal), payment, id);

// Delete order
export const deleteOrder = (id) =>
  db.prepare(`DELETE FROM orders WHERE id = ?`).run(id);

// Delete orders by restaurant id
export const deleteOrdersByRestaurantId = (restaurantid) =>
  db.prepare(`DELETE FROM orders WHERE restaurantid = ?`).run(restaurantid);

// Update order status
export const updateOrderStatus = (id, status) =>
  db.prepare(`UPDATE orders SET status = ? WHERE id = ?`).run(status, id);
