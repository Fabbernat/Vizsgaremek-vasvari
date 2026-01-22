const fs = require('fs')
const path = require('path')

const dataPath = path.join(__dirname, '../data/products.json')

function loadProducts() {
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
}

exports.getAllProducts = () => {
  return loadProducts()
}

exports.getProductById = (id) => {
  const products = loadProducts()
  return products.find(p => p.id === Number(id))
}
