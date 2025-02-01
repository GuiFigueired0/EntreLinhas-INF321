const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  book_id: { type: Number, required: true, unique: true },
  series_id: { type: Number, default: null },
  series_number: { type: Number, default: null },
  series_name: { type: String, default: null },
  title: { type: String, required: true },
  author_id: { type: Number, default: null },
  author_name: { type: String, default: null },
  publisher: { type: String, default: null },
  description: { type: String, default: null },
  num_pages: { type: Number, default: null },
  publication_day: { type: Number, default: null },
  publication_month: { type: Number, default: null },
  publication_year: { type: Number, default: null },
  image_url: { type: String, default: null },
  similar_books: { type: [Number], default: [] },
  ratings_per_star: { 
    type: Map, 
    of: Number, 
    default: { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0, total: 0 } 
  },
  genre: {
    type: String,
    required: true,
    enum: [
      'Children', 'Comics & Graphic', 'Fantasy & Paranormal', 'History & Biography',
      'Mystery, Thriller & Crime', 'Poetry', 'Romance', 'Young Adult'
    ]
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

BookSchema.virtual('rating').get(function () {
  const totalStars = [5, 4, 3, 2, 1].reduce((sum, star) => sum + (star * (this.ratings_per_star.get(String(star)) || 0)), 0);
  const totalRatings = [5, 4, 3, 2, 1].reduce((sum, star) => sum + (this.ratings_per_star.get(String(star)) || 0), 0);
  return totalRatings ? (totalStars / totalRatings).toFixed(2) : 0;
});

BookSchema.virtual('total_ratings').get(function () {
  return [5, 4, 3, 2, 1].reduce((sum, star) => sum + (this.ratings_per_star.get(String(star)) || 0), 0);
});

BookSchema.virtual('formattedDate').get(function () {
  const day = this.publication_day;
  const month = this.publication_month;
  const year = this.publication_year;
  
  if (!day || !month || !year) return null;
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  return `${monthNames[month - 1]} ${day}, ${year}`;
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

  static async findSimilarBooks(book_id) {
    const book = await BookModel.findOne({ book_id });
    if (!book) {
      throw new Error('Book not found');
    }
    const similarBooks = await BookModel.find({ book_id: { $in: book.similar_books } });
    return similarBooks;
  }
}

module.exports = Book;