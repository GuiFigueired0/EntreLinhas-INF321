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
