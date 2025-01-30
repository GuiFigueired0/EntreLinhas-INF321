const mongoose = require('mongoose');
const Book = require('./BookModel');

const SeriesSchema = new mongoose.Schema({
  series_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: null },
  books: { type: [Number], default: [] },
  number_of_books: { type: Number, required: true },
});

const SeriesModel = mongoose.model('Series', SeriesSchema);

class Series {
  constructor(data) {
    this.data = data;
  }

  async create() {
    return await SeriesModel.create(this.data);
  }

  static async findById(series_id, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    try {
      let series = await SeriesModel.findOne({ series_id });
  
      if (!series) {
        throw new Error(`Series with ID ${series_id} was not found.`);
      }
      
      series.books = series.books.slice(skip, skip+limit);
      const books = await Promise.all(
        series.books.map(async (book_id) => await Book.findById(parseInt(book_id)))
      );
  
      return { series, books };
    } catch (error) {
      console.error(`Error in findById: ${error.message}`);
      throw error;
    }
  }  
}

module.exports = Series;