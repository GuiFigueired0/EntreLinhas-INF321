const mongoose = require('mongoose');
const BookState = require('./BookStateModel');

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
  rating: { type: Number, default: null },
  text: { type: String, default: null },
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
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];
  
  return `${day} de ${monthNames[month - 1]} de ${year}`;
});

const ReviewModel = mongoose.model('Review', ReviewSchema);

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
    return review;
  }

  static async delete(reviewId) {
    return await ReviewModel.findByIdAndDelete(reviewId);
  } 

  static async findById(review_id) {
    return await ReviewModel.findById(review_id);
  }

  static async findByIds(user, book) {
    return await ReviewModel.findOne({ user, book });
  }

  static async findBookReviews(book, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await ReviewModel.find({ book }).skip(skip).limit(limit);
  }

  static async findUserReviews(user, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await ReviewModel.find({ user }).skip(skip).limit(limit);
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