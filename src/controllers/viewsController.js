const Series = require('../models/SeriesModel');
const Author = require('../models/AuthorModel');
const Book = require('../models/BookModel');
const Review = require('../models/ReviewModel');
const BookState = require('../models/BookStateModel');
const User = require('../models/UserModel');
const Activity = require('../models/ActivityModel');
const ReadingHistory = require('../models/ReadingHistoryModel');
const Bookshelf = require('../models/BookshelfModel');
const Connection = require('../models/ConnectionModel');

exports.db_playground = async(req, res) => {
  const user = req.session.user.id;
  res.render('db_playground', { user });
};

exports.list_group = async(req, res) => {
  res.render('list_group');
};

exports.login = async(req, res) => {
  res.render('login');
};

exports.index = async(req, res) => {
  try {
    const user = req.session.user.id;
    const nav_icon = req.session.user.user_data.image_url;
    const profile = await User.findById(user);
    if (!profile) {
      res.render('404', { number: 404, message: 'Profile not found.' });
    }
    const feed = await Activity.getFollowedFeed(user);
    let reading = await BookState.findUserState(user, 'Currently Reading');
    reading = await Promise.all(reading.map(async (book_state) => {
      const reading_history = await ReadingHistory.findBookHistory(user, book_state.book._id);
      return { book_state, reading_history, book: book_state.book };
    }));
    res.render('index', { 
      nav_icon,
      reading,
      feed,
      user
    });
  } catch (error) {
    console.log(error);
    res.render('404', { number: 400, message: 'Error when loading your dashboard.' });
  }
};

exports.profile = async(req, res) => {
  try {
    const user = req.session.user.id;
    const nav_icon = req.session.user.user_data.image_url;
    let { id } = req.params;
    const profile = await User.findById(id);
    if (!profile) {
      res.render('404', { number: 404, message: 'Profile not found.' });
    }
    const ownProfile = id == user;
    const connection = await Connection.findConnection(user, profile._id);
    const feed = await Activity.getUserFeed(id);
    const last_read = await BookState.findUserState(id, 'Read', 1, 10);
    res.render('profile', { 
      connection: connection.length > 0 ? connection[0] : undefined,
      ownProfile,
      last_read,
      nav_icon,
      profile, 
      feed,
      user,
    });
  } catch (error) {
    console.log(error);
    res.render('404', { number: 400, message: 'Error when loading the data for the profile.' });
  }
};

exports.search = async(req, res) => {
  try {
    const user = req.session.user.id;
    const nav_icon = req.session.user.user_data.image_url;
    const search_field = req.query.field || '';
    res.render('search', { 
      search_field,
      nav_icon,
      user
    });
  } catch (error) {
    console.log('teste', error);
    res.render('404', { number: 400, message: 'Error when loading the search screen.' });
  }
};

exports.series = async(req, res) => {
  try {
    const user = req.session.user.id;
    const nav_icon = req.session.user.user_data.image_url;
    const { id } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const data = await Series.findById(parseInt(id), page, limit);
    if (!data) {
      res.render('404', { number: 404, message: 'Series not found.' });
    } 
    res.render('list', { 
      data: data.series, 
      books: data.books, 
      nav_icon,
      page, 
      user
    });
  } catch (error) {
    console.log(error);
    res.render('404', { number: 400, message: 'Error when searching for the series.' });
  }
};

exports.author = async(req, res) => {
  try {
    const user = req.session.user.id;
    const nav_icon = req.session.user.user_data.image_url;
    const { id } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const data = await Author.findById(parseInt(id), page, limit);
    if (!data) {
      res.render('404', { number: 404, message: 'Author not found.' });
    } 
    res.render('list', { 
      data: data.author, 
      books: data.books, 
      nav_icon,
      page,
      user
    });
  } catch (error) {
    console.log(error);
    res.render('404', { number: 400, message: 'Error when searching for the author.' });
  }
};

exports.genre = async(req, res) => {
  try {
    const user = req.session.user.id;
    const nav_icon = req.session.user.user_data.image_url;
    const { genre } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const books = await Book.findByGenre(genre, page, limit);
    if (!books) {
      res.render('404', { number: 404, message: 'Genre not found.' });
    } 
    res.render('list', { 
      data: undefined,
      nav_icon,
      books,
      genre, 
      page, 
      user
    });
  } catch (error) {
    console.log(error);
    res.render('404', { number: 400, message: 'Error when searching for the genre.' });
  }
};

exports.bookshelf = async(req, res) => {
  try {
    const user = req.session.user.id;
    const nav_icon = req.session.user.user_data.image_url;
    const { bookshelf } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const info = await Bookshelf.findById(bookshelf, page, limit);
    if (!info) {
      res.render('404', { number: 404, message: 'Bookshelf not found.' });
    } 
    const books = await Bookshelf.getBooks(bookshelf);
    res.render('list', { 
      bookshelf: info, 
      data: undefined,
      nav_icon,
      books,
      page, 
      user
    });
  } catch (error) {
    console.log(error);
    res.render('404', { number: 400, message: 'Error when searching for the bookshelf.' });
  }
};

exports.book = async(req, res) => {
  try {
    const user = req.session.user.id;
    const nav_icon = req.session.user.user_data.image_url;
    let { id } = req.params;
    id = parseInt(id)
    const book = await Book.findById(id);
    if (!book) {
      res.render('404', { number: 404, message: 'Book not found.' });
    }
    let similar_books = await Book.findSimilarBooks(id);
    const reviews = await Review.findBookReviews(book._id, 1, 5);
    const user_review = await Review.findByIds(user, book._id);
    const book_state = await BookState.findBookState(user, book._id);
    res.render('book', { 
      book_state: book_state == null ? 'undefined' : book_state,
      series_url: `/series/view/${book.series_id}`,
      author_url: `/author/view/${book.author_id}`,
      similar_books, 
      user_review, 
      nav_icon,
      reviews, 
      book, 
      user,
    });
  } catch (error) {
    console.log(error);
    res.render('404', { number: 400, message: 'Error when loading the data for the book.' });
  }
};