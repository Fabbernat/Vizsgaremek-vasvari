import Database from "better-sqlite3";

const db = new Database("./database.sqlite");

const query = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        firstName TEXT,
        lastName TEXT,
        email TEXT,
        address TEXT
    )
`

db.exec(query);

export default db;
