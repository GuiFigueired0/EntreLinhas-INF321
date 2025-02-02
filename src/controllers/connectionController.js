const { ContextExclusionPlugin } = require('webpack');
const Connection = require('../models/ConnectionModel');

exports.create = async function (req, res) {
  try {
    const connection = await new Connection(req.body).create();
    res.status(201).json(connection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.findUserConnections = async function (req, res) {
  const render = req.query.render === "true";
  const ownProfile = req.query.ownProfile === "true";
  try {
    const { follower } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const connections = await Connection.findUserConnections(follower, parseInt(page), parseInt(limit));

    if (render) {
      let users = connections.map(connection => { return { user: connection.user, connection_id: connection._id }; });
      console.log(users)
      return res.render('includes/users_display', { users, ownProfile });
    }

    res.json(connections);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.findFollowers = async function (req, res) {
  const render = req.query.render === "true";
  const ownProfile = req.query.ownProfile === "true";
  try {
    const { user } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const connections = await Connection.findFollowers(user, parseInt(page), parseInt(limit));

    if (render) {
      let users = connections.map(connection => { return { user: connection.follower, connection_id: connection._id }; });
      console.log(users)
      return res.render('includes/users_display', { users, ownProfile });
    }

    res.json(followers);
  } catch (error) {
    res.status(400).json({ error: error.message });
 }
}

exports.deleteConnection = async function (req, res) {
  try {
    const { id } = req.params;
    await Connection.deleteConnection(id);
    res.json({ message: 'Connection deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
