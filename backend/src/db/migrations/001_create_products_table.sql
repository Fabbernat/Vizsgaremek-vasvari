CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  image_url TEXT,
  description TEXT,
  is_secondary INTEGER DEFAULT 0
);
