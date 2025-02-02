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

exports.searchByName = async function (req, res) {
  const render = req.query.render === "true";
  try {
    const { name } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const series = await Series.searchByName(name, page, limit);
    if (render) {
      return res.render('includes/series_display', { series });
    }

    return res.json(series); 
  } catch (e) {
    const message = 'Error when searching series by name.';
    if (render) {
      return res.render('404', { number: 400, message });
    }
    return res.status(400).json({ error: e, message: message });
  }
};