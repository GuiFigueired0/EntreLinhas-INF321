const mongoose = require('mongoose');
const Book = require('./BookModel');

const AuthorSchema = new mongoose.Schema({
  author_id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, default: null },
  books: { type: [Number], default: [] },
  image_url: { type: String, default: null },
});

const AuthorModel = mongoose.model('Author', AuthorSchema);

class Author {
  constructor(data) {
    this.data = data;
  }

  async create() {
    return await AuthorModel.create(this.data);
  }

  static async findById(author_id) {
    try {
      const author = await AuthorModel.findOne({ author_id });
  
      if (!author) {
        throw new Error(`Author with ID ${author_id} was not found.`);
      }
  
      const books = await Promise.all(
        author.books.map(async (book_id) => await Book.findById(parseInt(book_id)))
      );
  
      return { author, books };
    } catch (error) {
      console.error(`Error in findById: ${error.message}`);
      throw error;
    }
  }  
}

module.exports = Author;