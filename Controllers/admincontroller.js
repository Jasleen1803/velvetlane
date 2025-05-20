exports.loginForm = (req, res) => {
  res.render('admin/login');
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
    req.session.isAdmin = true;
    res.redirect('/admin/dashboard');
  } else {
    res.redirect('/admin/login');
  }
};

exports.dashboard = (req, res) => {
  res.render('admin/dashboard');
};
