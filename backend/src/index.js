// index.js
import express, { json } from 'express';
const app = express();
app.use(json());

let users = [];
let restaurants = [
  { id: 1, name: "Pizzéria" },
  { id: 2, name: "Sushi Bár" }
];
let foods = [
  { id: 1, restaurantId: 1, name: "Margherita", price: 1200 },
  { id: 2, restaurantId: 2, name: "Sushi Menü", price: 3500 }
];
let orders = [];

app.post('/register', (req, res) => {
  const { username } = req.body;
  users.push({ id: users.length+1, username });
  res.json({ success: true });
});

app.post('/login', (req, res) => {
  const { username } = req.body;
  const user = users.find(u => u.username === username);
  if (user) {
    res.json({ success: true, userId: user.id });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.get('/restaurants', (req, res) => {
  res.json(restaurants);
});

app.get('/foods/:restaurantId', (req, res) => {
  const id = parseInt(req.params.restaurantId);
  res.json(foods.filter(f => f.restaurantId === id));
});

app.post('/orders', (req, res) => {
  const { userId, items } = req.body;
  const order = { id: orders.length+1, userId, items, status: 'new' };
  orders.push(order);
  res.json(order);
});

app.post('/api/products', (req, res) => {
  const { name, price } = req.body;
  const newProduct = { id: foods.length + 1, name, price };
  foods.push(newProduct);
  res.status(201).json(newProduct);
});

export default app;

app.listen(3000, () => console.log("Backend fut a 3000-es porton"));
