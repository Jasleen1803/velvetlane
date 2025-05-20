const db = require('../database');

exports.listProducts = async (req, res) => {
  const [products] = await db.query('SELECT * FROM products');
  res.render('products/list', { products });
};

exports.addForm = (req, res) => {
  res.render('products/add');
};

exports.insertProduct = async (req, res) => {
  const { name, price, description } = req.body;
  await db.query('INSERT INTO products (name, price, description) VALUES (?, ?, ?)', [name, price, description]);
  res.redirect('/products');
};

exports.editForm = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
  res.render('products/edit', { product: rows[0] });
};

exports.updateProduct = async (req, res) => {
  const { name, price, description } = req.body;
  await db.query('UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?', [name, price, description, req.params.id]);
  res.redirect('/products');
};

exports.deleteProduct = async (req, res) => {
  await db.query('DELETE FROM products WHERE id = ?', [req.params.id]);
  res.redirect('/products');
};

exports.catalog = async (req, res) => {
  const [products] = await db.query('SELECT * FROM products');
  res.render('products/catalog', { products });
};
