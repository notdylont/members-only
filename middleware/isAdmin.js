const isAdmin = (req, res, next) => {
  if (req.user.is_admin) return next();
  res.redirect('/');
};

module.exports = isAdmin;
