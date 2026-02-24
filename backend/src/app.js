import express from 'express';
import cors from 'cors';
import path from 'path';
import Database from 'better-sqlite3';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Statikus fájlok kiszolgálása
app.use(express.static(path.join(__dirname, '../webui')));

// Health API
// Ez most annyira nem kell, mert van egy health.html oldalunk, de azért hagyom itt kommentben, hátha kell még
/*app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    system: 'Royal Delivery backend',
    time: new Date()
  });
});*/

// Admin, dashboard, api-docs oldalak
app.get('/admin-panel', (req, res) => {
  res.sendFile(path.join(__dirname, '../webui/admin-panel.html'));
});
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../webui/dashboard.html'));
});
app.get('/api-docs', (req, res) => {
  res.sendFile(path.join(__dirname, '../webui/api-docs.html'));
});
app.get('/health', (req, res) => {
  res.sendFile(path.join(__dirname, '../webui/health.html'));
});

// Dashboard statok API
app.get('/api/stats', (req, res) => {
  res.json({
    orders: 128,
    users: 42,
    restaurants: 16,
    couriers: 9,
    time: new Date()
  });
});

app.get('/api', (req, res) => {
  try {
    const data = fetchDataFromDatabase();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const dbPath = path.join(__dirname, '../data/database.sqlite');
try {
    const db = new Database(dbPath);
    console.log('Adatbázis sikeresen megnyitva:', dbPath);
} catch (err) {
  console.error('Hiba az adatbázis létrehozásakor:', err);
}

function fetchDataFromDatabase() {
  const stmt = db.prepare("SELECT * FROM restaurants");
  const rows = stmt.all();
  return rows;
}

export default app;