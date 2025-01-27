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