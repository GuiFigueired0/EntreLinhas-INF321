const Book = require('../models/BookModel');

exports.create = async function (req, res) {
  try {
    const book = new Book(req.body);
    const createdBook = await book.create();

    return res.status(201).json(createdBook);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Erro ao criar o livro.' });
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
    return res.status(400).json({ error: e, message: 'Erro ao buscar livros por gênero.' });
  }
};

exports.findById = async function (req, res) {
  try {
    const { id } = req.params;

    const book = await Book.findById(parseInt(id));
    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado.' });
    } 

    return res.json(book);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Erro ao buscar o livro.' });
  }
};

exports.searchByTitle = async function (req, res) {
  try {
    const { title } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const books = await Book.searchByTitle(title, page, limit);
    return res.json(books);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Erro ao buscar livros por título.' });
  }
};

exports.findSimilarBooks = async function (req, res) {
  try {
    const { id } = req.params;

    const book = await Book.findById(parseInt(id));
    if (!book) {
      return res.status(404).json({ message: 'Livro não encontrado.' });
    }

    const similarBooks = await Book.findSimilarBooks(book.similar_books);
    return res.json(similarBooks);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Erro ao buscar livros similares.' });
  }
};