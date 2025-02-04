const User = require('../models/UserModel');

exports.findById = async function (req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.updateById = async function (req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedUser = await User.updateById(id, updatedData);

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.searchByUsername = async function (req, res) {
  const render = req.query.render === "true";
  try {
    const { username } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    let users = await User.searchByUsername(username, page, limit);
    if (render) {
      users = users.map(user => { return { user, _id: user._id }; })
      return res.render('includes/display/users_display', { users });
    }

    return res.json(users); 
  } catch (e) {
    console.log(e);
    const message = 'Error when searching users by username.';
    if (render) {
      return res.render('404', { number: 400, message });
    }
    return res.status(400).json({ error: e, message: message });
  }
};
