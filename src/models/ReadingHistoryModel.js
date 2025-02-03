const mongoose = require('mongoose');
const BookState = require('./BookStateModel');

const ReadingHistorySchema = new mongoose.Schema({
  user: { 
    type: 
    mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  book: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Book', 
    required: true 
  },
  num_pages: { type: Number, required: true },
  progress: { type: Number, required: true },
  comment: { type: String, default: '' },
  timestamp: { type: Date, default: Date.now }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

ReadingHistorySchema.virtual('percentage').get(function () {
  return Math.floor(this.progress * 100 / this.num_pages);
});

const ReadingHistoryModel = mongoose.model('ReadingHistory', ReadingHistorySchema);

class ReadingHistory {
  constructor(data) {
    this.data = data;
  }

  async create() {
    const { user, book } = this.data;
    let bookState = await BookState.findBookState(user, book);
  
    if (!bookState || bookState.state != 'Currently Reading') {
      throw new Error('User must have the book in "Currently Reading" state to log reading progress.');
    }

    const readingHistory = await ReadingHistoryModel.create(this.data);
  
    if (readingHistory.progress == readingHistory.num_pages) {
      bookState = new BookState({ user: bookState.user, book: bookState.book, state: 'Read' });
      await bookState.mark();
    }

    return readingHistory;
  }

  static async delete(readingHirstoryId) {
    return await ReadingHistoryModel.findByIdAndDelete(readingHirstoryId);
  }

  static async findById(readingHirstoryId) {
    return await ReadingHistoryModel.findById(readingHirstoryId).populate('book');
  }

  static async findBookHistory(user, book) {
    return await ReadingHistoryModel.find({ user, book }).sort({ timestamp: -1 });
  }
}

module.exports = ReadingHistory