const Series = require('../models/SeriesModel');

exports.create = async function (req, res) {
  try {
    const series = new Series(req.body);
    const createdSeries = await series.create();

    return res.status(201).json(createdSeries);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Erro ao criar a série.' });
  }
};

exports.findById = async function (req, res) {
  try {
    const { id } = req.params;

    const series = await Series.findById(parseInt(id));
    if (!series) {
      return res.status(404).json({ message: 'Série não encontrada.' });
    } 

    return res.json(series);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Erro ao buscar a série.' });
  }
};

exports.findBooksById = async function (req, res) {
  try {
    const { id } = req.params;

    const books = await Series.findBooksById(parseInt(id));
    if (!books) {
      return res.status(404).json({ message: 'Ou a série não existe ou seus livros não foram encontrados.' });
    } 

    return res.json(books);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Erro ao buscar os livros da série.' });
  }
};