const express = require('express');
const router = express.Router();

// Dummy data (Replace with real DB logic later)
let products = [
  { id: 1, name: 'T-Shirt', price: 499, image: 'tshirt.jpg', description: 'Comfortable cotton tee' },
  { id: 2, name: 'Jeans', price: 999, image: 'jeans.jpg', description: 'Denim jeans' }
];

let orders = [
  { id: 101, username: 'Jassu', total: 1498, status: 'Pending' }
];

// Admin Dashboard
router.get('/', (req, res) => {
  res.render('adminDashboard');
});

// Products Page
router.get('/products', (req, res) => {
  res.render('adminProducts', { products });
});

// Add Product
router.post('/products/add', (req, res) => {
  const { name, price, image, description } = req.body;
  const newProduct = {
    id: Date.now(), name, price, image, description
  };
  products.push(newProduct);
  res.redirect('/admin/products');
});

// Delete Product
router.post('/products/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  res.redirect('/admin/products');
});

// Orders Page
router.get('/orders', (req, res) => {
  res.render('adminOrders', { orders });
});

// Mark Order Done
router.post('/orders/mark-done/:id', (req, res) => {
  const id = parseInt(req.params.id);
  orders = orders.map(order => order.id === id ? { ...order, status: 'Completed' } : order);
  res.redirect('/admin/orders');
});

module.exports = router;
