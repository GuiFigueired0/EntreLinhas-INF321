const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  book_id: { type: Number, required: true, unique: true },
  series_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Series', default: null },
  num_series: { type: Number, default: null },
  title: { type: String, required: true },
  authors: { type: [mongoose.Schema.Types.ObjectId], ref: 'Author', default: [] },
  publisher: { type: String, default: null },
  description: { type: String, default: null },
  num_pages: { type: Number, default: null },
  publication_day: { type: Number, default: null },
  publication_month: { type: Number, default: null },
  publication_year: { type: Number, default: null },
  image_url: { type: String, default: null },
  similar_books: { type: [Number], default: [] },   // List of book_ids
  ratings_per_star: { type: Map, of: Number, default: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, total: 0 } },
  genre: {
    type: String,
    required: true,
    enum: [
      'Children', 'Comics & Graphic', 'Fantasy & Paranormal', 'History & Biography',
      'Mystery, Thriller & Crime', 'Poetry', 'Romance', 'Young Adult'
    ],
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

BookSchema.virtual('rating').get(function () {
  const totalStars = [5, 4, 3, 2, 1].reduce((sum, star) => sum + (star * (this.ratings_per_star.get(star) || 0)), 0);
  const totalRatings = this.ratings_per_star.get('total') || 0;
  return totalRatings ? (totalStars / totalRatings).toFixed(2) : 0;
});

BookSchema.virtual('total_ratings').get(function () {
  return this.ratings_per_star.get('total') || 0;
});

const BookModel = mongoose.model('Book', BookSchema);

class Book {
  constructor(data) {
    this.data = data;
  }

  async create() {
    return await BookModel.create(this.data);
  }

  static async findByGenre(genre, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await BookModel.find({ genre }).skip(skip).limit(limit);
  }

  static async findById(book_id) {
    return await BookModel.findOne({ book_id });
  }

  static async searchByTitle(partialTitle, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await BookModel.find({ title: { $regex: partialTitle, $options: 'i' } }).skip(skip).limit(limit);
  }

  static async findSimilarBooks(book_ids) {
    return await BookModel.find({ book_id: { $in: book_ids } });
  }
}

module.exports = Book;