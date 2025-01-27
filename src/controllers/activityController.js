const Activity = require('../models/ActivityModel');
const Connection = require('../models/ConnectionModel');

exports.getUserFeed = async function (req, res) {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    
    const feed = await Activity.getUserFeed(id, page, limit);
    return res.json(feed);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Error fetching user feed.' });
  }
};

exports.getFeed = async function (req, res) {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const userConnections = await Connection.findUserConnections(id);
    const userIds = userConnections.map((connection) => connection.user._id);

    const feed = await Activity.getFollowedFeed(userIds, page, limit);
    return res.json(feed);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Error when searching the feed of followers.' });
  }
};
