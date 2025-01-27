const ReadingHistory = require('../models/ReadingHistoryModel');
const Activity = require('../models/ActivityModel');

exports.create = async function (req, res) {
  try {
    const readingHistory = new ReadingHistory(req.body);
    const result = await readingHistory.create();

    if (result) {
      const activity = new Activity({
        user: req.body.user,
        data_id: result._id,
        type: 'ReadingHistory'
      });
      await activity.create();
    }
    
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.findBookHistory = async function (req, res) {
  try {
    const { user, book } = req.params;

    const result = await ReadingHistory.findBookHistory(user, book);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.delete = async function (req, res) {
  try {
    const { id } = req.params;

    const result = await ReadingHistory.delete(id);
    await Activity.delete(id, 'ReadingHistory');
    
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}