import express from 'express';
import sqlite3 from 'sqlite3';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const db = new (sqlite3.verbose().Database)('royal_delivery_v2.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS menu (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price INTEGER NOT NULL,
        category TEXT NOT NULL,
        description TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT NOT NULL,
        delivery_address TEXT NOT NULL,
        ordered_items TEXT NOT NULL,
        total_amount INTEGER NOT NULL,
        order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);

    db.get("SELECT COUNT(*) as count FROM menu", [], (err, row) => {
        if (row && row.count === 0) {
            const stmt = db.prepare("INSERT INTO menu (name, price, category, description) VALUES (?, ?, ?, ?)");
            stmt.run("Angus Beef Steak", 8900, "Foetel", "Eerlelt marhabeelszin, szarvasgombas burgonyapepe, erdei gombamaartas");
            stmt.run("Lazac File", 6400, "Foetel", "Roston suelt vadlazac, parajkrem, fondant burgonya");
            stmt.run("Csokolade Szufe", 2400, "Desszert", "Folyos belseju premium etcsokolade, hazi malmavaartas");
            stmt.finalize();
        }
    });
});

// Vegpontok

// 1. Etlap lekerese (GET)
app.get('/api/menu', (req, res) => {
    db.all("SELECT * FROM menu", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Adatbazis hiba az etlap lekeresekor." });
        }
        res.json(rows);
    });
});

// 2. Uj rendeles leadaasa biztonsagi ellenorzessel (POST)
app.post('/api/orders', (req, res) => {
    const { name, address, items, total } = req.body;

    // Szerveroldali validacio a biztonsagert
    if (!name || typeof name !== 'string' || name.trim().length < 3) {
        return res.status(400).json({ error: "Ervenytelen vagy tul rovid nev." });
    }
    if (!address || typeof address !== 'string' || address.trim().length < 5) {
        return res.status(400).json({ error: "Ervenytelen vagy tul rovid szallitasi cim." });
    }
    if (!items || typeof items !== 'string' || items.length === 0) {
        return res.status(400).json({ error: "A kosar nem lehet ures." });
    }
    if (!total || typeof total !== 'number' || total <= 0) {
        return res.status(400).json({ error: "Ervenytelen vegosszeg." });
    }

    const stmt = db.prepare("INSERT INTO orders (customer_name, delivery_address, ordered_items, total_amount) VALUES (?, ?, ?, ?)");
    stmt.run([name.trim(), address.trim(), items, total], function (err) {
        if (err) {
            return res.status(500).json({ error: "Hiba tortent a rendeles mentese soran." });
        }
        res.status(201).json({ success: true, orderId: this.lastID });
    });
    stmt.finalize();
});

// 3. Rendelesek lekerese az admin felulet szamara (GET)
app.get('/api/orders', (req, res) => {
    db.all("SELECT * FROM orders ORDER BY id DESC", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Adatbazis hiba a rendelesek lekeresekor." });
        }
        res.json(rows);
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Szerver fut a ${PORT}-es porton.`));
