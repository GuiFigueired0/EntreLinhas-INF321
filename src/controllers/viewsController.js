const Contato = require('../models/ContatoModel');

exports.index = async(req, res) => {
  const contatos = await Contato.buscaContatos();
  res.render('index', { contatos });
};

exports.db_playground = async(req, res) => {
    res.render('db_playground');
};

exports.series_view = async(req, res) => {
    res.render('series_view');
};
  
exports.book_view = async(req, res) => {
  res.render('book_view');
};
