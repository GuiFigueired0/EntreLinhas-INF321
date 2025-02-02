const Series = require('../models/SeriesModel');
const Author = require('../models/AuthorModel');
const Book = require('../models/BookModel');
const Review = require('../models/ReviewModel');
const BookState = require('../models/BookStateModel');
const User = require('../models/UserModel');
const Activity = require('../models/ActivityModel');

const user = '67976b7e78e23443e48e341a';

exports.index = async(req, res) => {
  res.render('index');
};

exports.db_playground = async(req, res) => {
  res.render('db_playground', { user });
};

exports.list = async(req, res) => {
  res.render('list');
};
  
exports.book = async(req, res) => {
  res.render('book');
};

exports.list_group = async(req, res) => {
  res.render('list_group');
};

exports.login = async(req, res) => {
  res.render('login');
};

exports.search = async(req, res) => {
  res.render('search');
};

exports.series = async(req, res) => {
  try {
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
      page, 
      user 
    });
  } catch (error) {
    console.log(error);
    res.render('404', { number: 400, message: 'Error when searching for the author.' });
  }
};

exports.book = async(req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id)
    const book = await Book.findById(id);
    if (!book) {
      res.render('404', { number: 404, message: 'Book not found.' });
    }
    let similar_books = await Book.findSimilarBooks(id);
    const reviews = await Review.findBookReviews(book._id, 1, 5);
    const user_review = await Review.findByIds(user, book._id);
    const bookState = await BookState.findBookState(user, book._id);
    console.log(reviews.length)
    res.render('book', { 
      user,
      book, 
      similar_books, 
      user_review, 
      reviews, 
      bookState,
      series_url: `/series/view/${book.series_id}`,
      author_url: `/author/view/${book.author_id}`,
    });
  } catch (error) {
    console.log(error);
    res.render('404', { number: 400, message: 'Error when loading the data for the book.' });
  }
};

exports.profile = async(req, res) => {
  try {
    let { id } = req.params;
    const profile = await User.findById(id);
    if (!profile) {
      res.render('404', { number: 404, message: 'Profile not found.' });
    }
    const ownProfile = id == user;
    const feed = ownProfile ? await Activity.getFollowedFeed(id) : await Activity.getUserFeed(id);
    let recent = await BookState.findUserState(id, 'Currently Reading', 1, 10);
    console.log(recent)
    res.render('profile', { 
      ownProfile,
      profile, 
      feed,
      user,
      recent
    });
  } catch (error) {
    console.log(error);
    res.render('404', { number: 400, message: 'Error when loading the data for the profile.' });
  }
};