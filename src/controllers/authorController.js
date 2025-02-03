const Author = require('../models/AuthorModel');

exports.create = async function (req, res) {
  try {
    const author = new Author(req.body);
    const createdAuthor = await author.create();

    return res.status(201).json(createdAuthor);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Error creating author.' });
  }
};

exports.findById = async function (req, res) {
  try {
    const { id } = req.params;

    const data = await Author.findById(parseInt(id));
    if (!data) {
      return res.status(404).json({ message: 'Author not found.' });
    } 

    return res.json(data);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Error searching for the author.' });
  }
};

exports.searchByName = async function (req, res) {
  const render = req.query.render === "true";
  try {
    const { name } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const authors = await Author.searchByName(name, page, limit);
    if (render) {
      return res.render('includes/display/authors_display', { authors });
    }

    return res.json(authors); 
  } catch (e) {
    const message = 'Error when searching author by name.';
    if (render) {
      return res.render('404', { number: 400, message });
    }
    return res.status(400).json({ error: e, message: message });
  }
};