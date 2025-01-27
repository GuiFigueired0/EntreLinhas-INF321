const BookState = require('../models/BookStateModel');
const Review = require('../models/ReviewModel');
const Activity = require('../models/ActivityModel');
const ReadingHistory = require('../models/ReadingHistoryModel');

exports.mark = async function (req, res) {
  try {
    const bookState = new BookState(req.body);
    const result = await bookState.mark();

    if (result.new) {
      const activity = new Activity({
        user: req.body.user,
        data_id: result.bookState._id,
        type: 'BookState'
      });
      await activity.create();
    }

    res.status(200).json(result.bookState);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.findById = async function (req, res) {
  try {
    const { id } = req.params;
    const bookState = await BookState.findById(id);
    res.status(200).json(bookState);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.findUserState = async function (req, res) {
  try {
    const { user, state } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const states = await BookState.findUserState(user, state, page, limit);
    res.status(200).json(states);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

exports.delete = async function (req, res) {
  try {
    const { id } = req.params;

    let bookState = await BookState.findById(id);
    if (!bookState) {
      throw new Error('BookState not found');
    }

    const readingHistories = await ReadingHistory.findBookHistory(bookState.user, bookState.book);
    if (readingHistories) {
      await Promise.all(
        readingHistories.map(async (rh) => await ReadingHistory.delete(rh._id))
      );
      await Promise.all(
        readingHistories.map(async (rh) => await Activity.delete(rh._id, 'ReadingHistory'))
      );
    }

    let review = await Review.findByIds(bookState.user, bookState.book);
    if (review) {
      review = await Review.delete(review._id);
      await Activity.delete(review._id, 'Review');
    }

    bookState = await BookState.delete(bookState._id);
    await Activity.delete(bookState._id, 'BookState');

    res.status(200).json({ message: 'BookState and all related data deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}