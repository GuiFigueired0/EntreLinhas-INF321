const mongoose = require('mongoose');
const Book = require('./BookModel');

const SeriesSchema = new mongoose.Schema({
  series_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: null },
  books: { type: [Number], default: [] },   // List of book_ids
});

const SeriesModel = mongoose.model('Series', SeriesSchema);

class Series {
  constructor(data) {
    this.data = data;
  }

  async create() {
    return await SeriesModel.create(this.data);
  }

  static async findById(series_id) {
    return await SeriesModel.findOne({ series_id });
  }

  static async findBooksById(series_id) {
    try {
      const series = await SeriesModel.findOne({ series_id });
  
      if (!series) {
        throw new Error(`Série com ID ${series_id} não foi encontrada.`);
      }
  
      const books = await Promise.all(
        series.books.map(async (book_id) => await Book.findById(parseInt(book_id)))
      );
  
      return books;
    } catch (error) {
      console.error(`Erro em findBooksById: ${error.message}`);
      throw error;
    }
  }  
}

module.exports = Series;