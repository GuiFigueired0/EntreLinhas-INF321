const Contato = require('../models/ContatoModel');

exports.index = async(req, res) => {
  const contatos = await Contato.buscaContatos();
  res.render('index', { contatos });
};

exports.db_playground = async(req, res) => {
    res.render('db_playground');
};

exports.gallery = async(req, res) => {
    res.render('gallery');
};
  