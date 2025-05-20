const db = require('../database');

exports.listOrders = async (req, res) => {
  const [orders] = await db.query('SELECT * FROM orders');
  res.render('orders/orders', { orders });
};
