const Login = require('../models/LoginModel');

exports.register = async function (req, res) {
  const login = new Login(req.body);
  try {
    await login.register();

    if (login.errors.length > 0) {
      return res.status(400).json({ errors: login.errors });
    }

    return res.status(201).json(login.data);
  } catch (e) {
    return res.status(500).json({ error: e.message, message: 'Error registering user.' });
  }
};

exports.login = async function (req, res) {
  try {
    const login = new Login(req.body);
    await login.login();

    if (login.errors.length > 0) {
      return res.status(400).json({ errors: login.errors });
    }

    req.session.user = { id: login.data.user._id, user_data: login.data.user };
    return res.status(200).json({ message: 'Login successful.', user: req.session.user.user_data });
  } catch (e) {
    return res.status(500).json({ error: e.message, message: 'Error when logging in.' });
  }
};

exports.logout = function (req, res) {
  req.session.destroy();
  return res.status(200).json({ message: 'Logout completed successfully.' });
};