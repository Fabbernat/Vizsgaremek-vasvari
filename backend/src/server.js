import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Royal Delivery backend fut 🚀");
});

app.listen(PORT, () => {
  console.log(`A szerver fut a http://localhost:${PORT} porton.`);
});