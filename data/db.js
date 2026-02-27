import Database from "better-sqlite3";

const db = new Database("./database.sqlite");

const users = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        firstName TEXT,
        lastName TEXT,
        email TEXT,
        address TEXT
    )
`

db.exec(users);

const restaurants = `
    CREATE TABLE IF NOT EXISTS restaurants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        ownerid INTEGER,
        FOREIGN KEY(ownerid) REFERENCES owners(id)
    )
`
db.exec(restaurants);

const owners = `
    CREATE TABLE IF NOT EXISTS owners (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        email TEXT,
        password TEXT
    )
`
db.exec(owners);

const orders = `
    CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userid INTEGER,
        date TEXT,
        FOREIGN KEY(userid) REFERENCES users(id)
    )
`
db.exec(orders);

const meals = `
    CREATE TABLE IF NOT EXISTS meals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price INTEGER
    )
`

db.exec(meals);

export default db;
