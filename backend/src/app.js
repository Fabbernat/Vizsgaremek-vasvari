import { healthCheck } from './controllers/health.controller.js';
import express from 'express';
import cors from 'cors';

const productRoutes = require('./routes/product.routes')

const port = process.env.PORT || 3000;
export const app = express();

app.use(cors())
app.use(express.json())
// Statikus fájlok (képek)
app.use('/images', express.static('public/images'))

app.use('/api/products', productRoutes)

// Termékek betöltése a JSON fájlból
const fs = require('fs')
const path = require('path')
const productsFilePath = path.join('data', 'products.json')

app.get('/api/products', (req, res) => {
  fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Nem sikerült betölteni a termékeket' })
      return
    }
    const products = JSON.parse(data)
    res.json(products)
  })
})

app.listen(port, () => {
  console.log(`Backend fut a http://localhost:${port}`)
});

console.log("The backend has started succesfully...🥀");

healthCheck(); // health controller létrehozása a kettővel ezelőtti commitban

module.exports = app

export default app;