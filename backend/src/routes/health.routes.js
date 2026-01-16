import { app } from '../app.js';
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});