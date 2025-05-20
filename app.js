const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Import Routes
const productRoutes = require('./routes/productroutes');
const orderRoutes = require('./routes/orderroutes');
const adminRoutes = require('./routes/adminroutes');

// Set EJS as View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // Serve CSS, JS, Images

// Route Handling for Routes Folder
app.use('/', productRoutes);       // Customer-facing product pages
app.use('/orders', orderRoutes);   // Customer-facing orders
app.use('/admin', adminRoutes);    // Admin panel

// ➕ Direct routes for individual pages (optional fallback if not in router files)
app.get('/cart', (req, res) => res.render('cart'));
app.get('/checkout', (req, res) => res.render('checkout'));
app.get('/contentpage', (req, res) => res.render('contentpage'));
app.get('/product1', (req, res) => res.render('product1'));
app.get('/PRODUCTLIST', (req, res) => res.render('PRODUCTLIST')); // lowercase match
app.get('/productdetails', (req, res) => res.render('productdetails'));
app.get('/thankupage', (req, res) => res.render('thankupage'));


// Admin fallback views (if not handled in adminroutes.js)
app.get('/admin/dashboard', (req, res) => res.render('adminDashboard'));
app.get('/admin/products', (req, res) => res.render('adminProducts'));
app.get('/admin/orders', (req, res) => res.render('adminOrders'));

// 404 Fallback
app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
