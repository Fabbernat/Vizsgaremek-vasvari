import express from "express";

const route = express.Router();

// Get all orders
route.get("/orders", (req, res) => {
  const orders = Orders.getOrders();
  res.status(201).json(orders);
});

// Get order by id
route.get("/orders/:id", (req, res) => {
  const order = Orders.getOrdersById(+req.params.id);
  res.status(200).json(order);
});

// Create order
route.post("/add-order", (req, res) => {
  const { restaurantid, userid, date, orderedmeal, payment } = req.body;
  if (!restaurantid || !userid || !date || !orderedmeal || !payment) {
    return res.status(400).json({
      message: "Missing data!",
    });
  }
  const order = Orders.createOrder(
    restaurantid,
    userid,
    date,
    orderedmeal,
    payment,
  );
  res.status(201).json({ message: "Order created!", order });
});

// Update order
route.put("/orders/:id", (req, res) => {
  const { restaurantid, userid, date, orderedmeal, payment } = req.body;
  if (!restaurantid || !userid || !date || !orderedmeal || !payment) {
    return res.status(400).json({
      message: "Missing data!",
    });
  }
  const order = Orders.updateOrder(
    +req.params.id,
    restaurantid,
    userid,
    date,
    orderedmeal,
    payment,
  );
  res.status(200).json({ message: "Order updated!", order });
});

// Delete order
route.delete("/orders/:id", (req, res) => {
  const order = Orders.deleteOrder(+req.params.id);
  res.status(200).json({ message: "Order deleted!", order });
});
