import db from './database.js';

db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    imageUrl TEXT,
    description TEXT
  );
`);

console.log('Migration finished');
