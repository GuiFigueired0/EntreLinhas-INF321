const Series = require('../models/SeriesModel');

exports.create = async function (req, res) {
  try {
    const series = new Series(req.body);
    const createdSeries = await series.create();

    return res.status(201).json(createdSeries);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Error creating the series.' });
  }
};

exports.findById = async function (req, res) {
  try {
    const { id } = req.params;

    const data = await Series.findById(parseInt(id));
    if (!data) {
      return res.status(404).json({ message: 'Series not found.' });
    } 

    return res.json(data);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Error when searching for the series.' });
  }
};