const Author = require('../models/AuthorModel');

exports.create = async function (req, res) {
  try {
    const author = new Author(req.body);
    const createdAuthor = await author.create();

    return res.status(201).json(createdAuthor);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Erro ao criar o autor.' });
  }
};

exports.findById = async function (req, res) {
  try {
    const { id } = req.params;

    const author = await Author.findById(parseInt(id));
    if (!author) {
      return res.status(404).json({ message: 'Autor não encontrado.' });
    } 

    return res.json(author);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Erro ao buscar o autor.' });
  }
};

exports.findBooksById = async function (req, res) {
  try {
    const { id } = req.params;

    const books = await Author.findBooksById(parseInt(id));
    if (!books) {
      return res.status(404).json({ message: 'Ou o autor não existe ou seus livros não foram encontrados.' });
    } 

    return res.json(books);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Erro ao buscar os livros do autor.' });
  }
};