const mongoose = require('mongoose');
const BookState = require('./BookStateModel');
const User = require('./UserModel');

const ReviewSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  book: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Book', 
    required: true 
  },
  rating: { type: Number, default: 0 },
  title: { type: String, default: '' },
  text: { type: String, default: '' },
  finished: { type: Boolean, default: true }, 
  last_alteration_day: { type: Number, default: null },
  last_alteration_month: { type: Number, default: null },
  last_alteration_year: { type: Number, default: null },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

ReviewSchema.virtual('formattedDate').get(function () {
  const day = this.last_alteration_day;
  const month = this.last_alteration_month;
  const year = this.last_alteration_year;
  
  if (!day || !month || !year) return null;
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return `${monthNames[month - 1]} ${day}, ${year}`;
});

const ReviewModel = mongoose.model('Review', ReviewSchema);

async function updateUserCounter(userId, increment = true) {
  const update = { $inc: { ['reviews_count']: increment ? 1 : -1 } };
  return await User.findByIdAndUpdate(userId, update);
}

class Review {
  constructor(data) {
    this.data = data;
  }

  async create() {
    const bookState = await BookState.findBookState(this.data.user, this.data.book);

    if (!bookState || !['Read', 'Abandoned'].includes(bookState.state)) {
      throw new Error('User must have the book in "Read" or "Abandoned" state to create a review.');
    }

    const now = new Date();
    this.data.last_alteration_day = now.getDate();
    this.data.last_alteration_month = now.getMonth() + 1;
    this.data.last_alteration_year = now.getFullYear();
    this.data.finished = bookState.state === 'Read';
    const review = await ReviewModel.create(this.data);
    updateUserCounter(review.user);
    return review;
  }

  static async delete(reviewId) {
    const review = await ReviewModel.findByIdAndDelete(reviewId);
    updateUserCounter(review.user, false);
    return review;
  } 

  static async findById(review_id) {
    return await ReviewModel.findById(review_id).populate('book');
  }

  static async findByIds(user, book) {
    return await ReviewModel.findOne({ user, book });
  }

  static async findBookReviews(book, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await ReviewModel.find({ book }).populate({ path: 'user', select: '_id username image_url' }).skip(skip).limit(limit);
  }

  static async findUserReviews(user, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await ReviewModel.find({ user }).populate('book').skip(skip).limit(limit);
  }

  static async updateById(review_id, data) {
    const updatedData = { ...data };

    if (updatedData.text || updatedData.rating) {
      const now = new Date();
      updatedData.last_alteration_day = now.getDate();
      updatedData.last_alteration_month = now.getMonth() + 1;
      updatedData.last_alteration_year = now.getFullYear();
    }

    return await ReviewModel.findByIdAndUpdate(review_id, updatedData, { new: true });
  } 
}

module.exports = Review;