const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'jas_2011', // add your MySQL password if set
  database: 'velvetlane'
});

// Admin Dashboard
router.get('/', (req, res) => {
  res.render('adminDashboard');
});

// Products Page
router.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      console.error('Error fetching products:', err);
      return res.status(500).send('Server error');
    }
    res.render('adminProducts', { products: results });
  });
});

// Add Product
router.post('/products/add', (req, res) => {
  const { name, price, image, description } = req.body;
  const query = 'INSERT INTO products (name, price, image, description) VALUES (?, ?, ?, ?)';
  db.query(query, [name, price, image, description], (err) => {
    if (err) {
      console.error('Error adding product:', err);
      return res.status(500).send('Server error');
    }
    res.redirect('/admin/products');
  });
});

// Delete Product
router.post('/products/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM products WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error deleting product:', err);
      return res.status(500).send('Server error');
    }
    res.redirect('/admin/products');
  });
});

// Orders Page
router.get('/orders', (req, res) => {
  db.query('SELECT * FROM orders', (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).send('Server error');
    }
    res.render('adminOrders', { orders: results });
  });
});

// Mark Order Done
router.post('/orders/mark-done/:id', (req, res) => {
  const id = req.params.id;
  db.query('UPDATE orders SET status = "Completed" WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error updating order status:', err);
      return res.status(500).send('Server error');
    }
    res.redirect('/admin/orders');
  });
});

module.exports = router;
