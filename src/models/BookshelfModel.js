const mongoose = require('mongoose');
const Book = require('./BookModel');
const User = require('./UserModel');

const BookshelfSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: { type: String, required: true },
  books: { type: [Number], default: [] },
  followers: { 
    type: [mongoose.Schema.Types.ObjectId], 
    ref: 'User', 
    default: [] 
  },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

BookshelfSchema.virtual('length').get(function () {
  return this.books.length;
});

const BookshelfModel = mongoose.model('Bookshelf', BookshelfSchema);

class Bookshelf {
  constructor(data) {
    this.data = data;
  }

  async create() {
    const bookshelf = await BookshelfModel.create(this.data);
    
    await User.findByIdAndUpdate(this.data.owner, {
      $push: { bookshelves: bookshelf._id },
    });
    return bookshelf;
  }

  static async findById(bookshelf_id) {
    return await BookshelfModel.findById(bookshelf_id).populate('owner');
  }

  static async findByOwner(owner) {
    return await BookshelfModel.find({ owner });
  }

  static async getBooks(bookshelf_id) {
    const bookshelf = await BookshelfModel.findById(bookshelf_id);
    if (!bookshelf) {
      throw new Error(`Bookshelf with ID ${bookshelf_id} not found.`);
    }
    const books = await Promise.all(
      bookshelf.books.map(async (book_id) => await Book.findById(book_id))
    );
    return books;
  }

  static async getBookshelvesInfo(bookshelf_ids) {
    return await BookshelfModel.find({ _id: { $in: bookshelf_ids } }).select('_id name owner');
  }

  static async addBook(bookshelf_id, book_id) {
    return await BookshelfModel.findByIdAndUpdate(bookshelf_id, {
      $addToSet: { books: book_id },
    }, { new: true });
  }

  static async removeBook(bookshelf_id, book_id) {
    return await BookshelfModel.findByIdAndUpdate(bookshelf_id, {
      $pull: { books: book_id },
    }, { new: true });
  }

  static async deleteBookshelf(bookshelf_id) {
    const bookshelf = await BookshelfModel.findByIdAndDelete(bookshelf_id);
    if (!bookshelf) {
      throw new Error(`Bookshelf with ID ${bookshelf_id} not found.`);
    }

    await User.findByIdAndUpdate(bookshelf.owner, {
      $pull: { bookshelves: bookshelf._id },
    });

    await Promise.all(
      bookshelf.followers.map(async (user_id) => {
        await User.findByIdAndUpdate(user_id, {
          $pull: { bookshelves: bookshelf._id },
        });
      })
    );

    return bookshelf;
  }

  static async saveBookshelf(user_id, bookshelf_id) {
    await BookshelfModel.findByIdAndUpdate(bookshelf_id, {
      $addToSet: { followers: user_id },
    });
    await User.findByIdAndUpdate(user_id, {
      $addToSet: { bookshelves: bookshelf_id },
    });
  }
}

module.exports = Bookshelf;