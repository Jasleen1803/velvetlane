const express = require('express');
const router = express.Router();

router.post('/place', (req, res) => {
  const { total } = req.body;
  req.app.locals.db.query('INSERT INTO orders (total) VALUES (?)', [total], (err) => {
    if (err) throw err;
    res.redirect('/thankyou');
  });
});

module.exports = router;

