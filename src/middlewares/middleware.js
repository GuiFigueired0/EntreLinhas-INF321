exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  res.locals.csrfToken = 123;
  next();
};

exports.loginRequired = (req, res, next) => {
  if(!req.session.user) {
    req.session.save(() => res.redirect('/login'));
    return;
  }

  next();
};
