import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import multer from "multer";
import mealRoutes from "./routes/mealRoutes.js";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import db from "./data/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

const uploadsDir = path.resolve("./uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});
const upload = multer({ storage });

db.prepare(
  `CREATE TABLE IF NOT EXISTS restaurant_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    restaurant_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    image_type TEXT,
    sort_order INTEGER DEFAULT 0
  )`,
).run();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(uploadsDir));

app.post("/upload-photo", upload.single("photo"), async (req, res) => {
  try {
    const restaurantId = Number(req.body.restaurant_id);
    if (!req.file) {
      return res.status(400).json({ message: "Kép szükséges." });
    }
    if (!restaurantId) {
      return res.status(400).json({ message: "restaurant_id szükséges." });
    }

    const imagePath = `/uploads/${req.file.filename}`;
    db.prepare(
      "INSERT INTO restaurant_images (restaurant_id, image_url) VALUES (?, ?)",
    ).run(restaurantId, imagePath);

    res.status(201).json({ message: "Feltöltés sikeres.", imagePath });
  } catch (error) {
    console.error(error.stack || error);
    res.status(500).json({ message: "Szerverhiba történt." });
  }
});

app.use("/", mealRoutes);
app.use("/", restaurantRoutes);
app.use("/", userRoutes);
app.use("/", orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
