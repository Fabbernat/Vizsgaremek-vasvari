import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

// Statikus fájlok kiszolgálása
app.use(express.static(path.join(__dirname, 'public')));

// Health API
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    system: 'Royal Delivery backend',
    time: new Date()
  });
});

// Admin, dashboard, api-docs oldalak
app.get('/admin-panel', (req, res) => {
  res.sendFile(path.join(__dirname, '../webui', 'admin-panel.html'));
});
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../webui', 'dashboard.html'));
});
app.get('/api-docs', (req, res) => {
  res.sendFile(path.join(__dirname, '../webui', 'api-docs.html'));
});
app.get('/health-monitor', (req, res) => {
  res.sendFile(path.join(__dirname, '../webui', 'health.html'));
});

export default app;