const service = require('../services/product.service')

exports.getAll = (req, res) => {
  const products = service.getAllProducts()
  res.json(products)
}

exports.getById = (req, res) => {
  const product = service.getProductById(req.params.id)

  if (!product) {
    return res.status(404).json({ message: 'Nincs ilyen termék' })
  }

  res.json(product)
}
