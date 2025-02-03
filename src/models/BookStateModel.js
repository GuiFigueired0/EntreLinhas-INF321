const mongoose = require('mongoose');
const User = require('./UserModel');

const BookStateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  state: {
    type: String,
    required: true,
    enum: ['Want to Read', 'Currently Reading', 'Read', 'Abandoned'],
  },
  timestamp: { type: Date, default: Date.now }
});

async function updateUserCounter(userId, state, increment = true) {
  const fieldMap = {
    'Want to Read': 'want_to_read_count',
    'Currently Reading': 'currently_reading_count',
    'Read': 'read_count',
    'Abandoned': 'abandoned_count',
  };

  const field = fieldMap[state];
  if (!field) return;

  const update = { $inc: { [field]: increment ? 1 : -1 } };
  await User.findByIdAndUpdate(userId, update);
}

const BookStateModel = mongoose.model('BookState', BookStateSchema);

class BookState {
  constructor(data) {
    this.data = data;
  }

  async mark() {
    const { user, book, state } = this.data;

    let existingState = await BookStateModel.findOne({ user, book });

    if (existingState) {
      if (existingState.state === state) {
        return { bookState: existingState, new: false };
      }
      await updateUserCounter(user, existingState.state, false);
      existingState = await BookStateModel.findByIdAndUpdate(existingState._id, { state }, { new: true });
      await updateUserCounter(user, state, true);
      
      return { bookState: existingState, new: true };
    } else {
      const bookState = await BookStateModel.create({ user, book, state });
      await updateUserCounter(user, state, true);
      
      return { bookState: bookState, new: true };
    }
  }

  static async findById(bookStateId) {
    return await BookStateModel.findById(bookStateId).populate('book');
  }

  static async findBookState(user, book) {
    return await BookStateModel.findOne({user, book});
  }

  static async findUserState(user, state, page = 1, limit = null) {
    if (limit) {
      const skip = (page - 1) * limit;
      return await BookStateModel.find({ user, state })
        .sort({ timestamp: -1 })
        .populate('book')
        .skip(skip)
        .limit(limit);
    } else {
      return await BookStateModel.find({ user, state })
        .sort({ timestamp: -1 })
        .populate('book')
    }
  }

  static async delete(bookStateId) {
    const bookState = await BookStateModel.findByIdAndDelete(bookStateId);
    if (!bookState) {
      throw new Error('BookState not found');
    }

    await updateUserCounter(bookState.user, bookState.state, false);
    return bookState;
  }
}

module.exports = BookState;