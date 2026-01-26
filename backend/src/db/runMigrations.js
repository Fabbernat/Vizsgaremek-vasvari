const Database = require('better-sqlite3')
const fs = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, 'database.sqlite')
const migrationsPath = path.join(__dirname, 'migrations')

const db = new Database(dbPath)

const files = fs
  .readdirSync(migrationsPath)
  .filter(f => f.endsWith('.sql'))
  .sort()

for (const file of files) {
  const sql = fs.readFileSync(path.join(migrationsPath, file), 'utf8')
  db.exec(sql)
  console.log(`✔ Migráció lefutott: ${file}`)
}

db.close()
