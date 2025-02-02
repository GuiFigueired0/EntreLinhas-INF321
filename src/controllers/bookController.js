const Book = require('../models/BookModel');

exports.create = async function (req, res) {
  try {
    const book = new Book(req.body);
    const createdBook = await book.create();

    return res.status(201).json(createdBook);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Error creating the book.' });
  }
};

exports.findByGenre = async function (req, res) {
  try {
    const { genre } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const books = await Book.findByGenre(genre, page, limit);
    return res.json(books);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Error when searching books by genre.' });
  }
};

exports.findById = async function (req, res) {
  try {
    const { id } = req.params;

    const book = await Book.findById(parseInt(id));
    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    } 

    return res.json(book);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Error when searching for the book.' });
  }
};

exports.searchByTitle = async function (req, res) {
  const render = req.query.render === "true";
  try {
    const { title } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const books = await Book.searchByTitle(title, page, limit);

    if (render) {
      return res.render('includes/gallery', { isSimple: false, books });
    }

    return res.json(books); 
  } catch (e) {
    const message = 'Error when searching books by title.';
    if (render) {
      return res.render('404', { number: 400, message });
    }
    return res.status(400).json({ error: e, message: message });
  }
};

exports.findSimilarBooks = async function (req, res) {
  try {
    const { id } = req.params;

    const similarBooks = await Book.findSimilarBooks(parseInt(id));
    return res.json(similarBooks);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Error when searching for similar books.' });
  }
};