function checkAuthentication(req, res, next) {
  console.log('checkAuth =>', req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(401).send({ message: 'ログインしてください。' });
}

module.exports = checkAuthentication;
