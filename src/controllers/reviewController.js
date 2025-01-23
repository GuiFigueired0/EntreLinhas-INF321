const Review = require('../models/ReviewModel');

exports.create = async function (req, res) {
  try {
    const review = new Review(req.body);
    const createdReview = await review.create();

    return res.status(201).json(createdReview);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Erro ao criar a review.' });
  }
};

exports.findById = async function (req, res) {
  try {
    const { id } = req.params;

    const review = await Review.findById(parseInt(id));
    if (!review) {
      return res.status(404).json({ message: 'Review não encontrada.' });
    } 

    return res.json(review);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Erro ao buscar a review.' });
  }
};

exports.findBookReviews = async function (req, res) {
  try {
    const { book_id } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const reviews = await Review.findBookReviews(book_id, page, limit);
    return res.json(reviews);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Erro ao buscar as reviews de um livro.' });
  }
};

exports.findUserReviews = async function (req, res) {
  try {
    const { user_id } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const reviews = await Review.findUserReviews(user_id, page, limit);
    return res.json(reviews);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Erro ao buscar as reviews de um usuário.' });
  }
};

exports.update = async function (req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;
  
    const updatedReview = await Review.updateById(id, updatedData);
    if (!updatedReview) {
      return res.status(404).json({ message: 'Review não encontrada.' });
    }
  
    return res.json(updatedReview);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Erro ao editar a review.' });
  }
};

exports.findBasicInfo = async function (req, res) {
  try {
    const { id } = req.params;
  
    const review = await Review.findBasicInfo(id);
    if (!review) {
      return res.status(404).json({ message: 'Review não encontrada.' });
    }
  
    return res.json(review);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Erro ao buscar informações básicas da review.' });
  }
};
  
  