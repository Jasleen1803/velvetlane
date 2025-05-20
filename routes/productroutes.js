const express = require('express');
const router = express.Router();
const db = require('../database/index');

// Home Page
router.get('/', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) throw err;
    res.render('index', { products: results });
  });
});

// Product Details
router.get('/product/:id', (req, res) => {
  const productId = req.params.id;
  db.query('SELECT * FROM products WHERE id = ?', [productId], (err, results) => {
    if (err) throw err;
    res.render('productdetails', { product: results[0] });
  });
});

module.exports = router;
