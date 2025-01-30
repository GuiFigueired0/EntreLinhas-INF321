const user = '67976b7e78e23443e48e341a';
const Series = require('../models/SeriesModel');
const Author = require('../models/AuthorModel');

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

exports.profile = async(req, res) => {
  res.render('profile', { user });
};

exports.list_group = async(req, res) => {
  res.render('list_group');
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
    res.render('list', { data: data.series, books: data.books, page, user });
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
    res.render('list', { data: data.author, books: data.books, page, user });
  } catch (error) {
    console.log(error);
    res.render('404', { number: 400, message: 'Error when searching for the author.' });
  }
};
