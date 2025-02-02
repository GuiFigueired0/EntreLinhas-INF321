const Review = require('../models/ReviewModel');
const Activity = require('../models/ActivityModel');

exports.create = async function (req, res) {
  try {
    const review = new Review(req.body);
    const createdReview = await review.create();

    if (createdReview) {
      const activity = new Activity({
        user: req.body.user,
        data_id: createdReview._id,
        type: 'Review'
      });
      await activity.create();
    }

    return res.status(201).json(createdReview);
  } catch (e) {
    return res.status(400).json({ error: e.message, message: 'Error creating review.' });
  }
};

exports.update = async function (req, res) {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedReview = await Review.updateById(id, updatedData);
    if (!updatedReview) {
      return res.status(404).json({ message: 'Review not found.' });
    }

    return res.json(updatedReview);
  } catch (e) {
    return res.status(400).json({ error: e.message, message: 'Error updating review.' });
  }
};

exports.findById = async function (req, res) {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found.' });
    } 

    return res.json(review);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Error when searching for review.' });
  }
};

exports.findBookReviews = async function (req, res) {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const reviews = await Review.findBookReviews(id, page, limit);
    return res.json(reviews);
  } catch (e) {
    return res.status(400).json({ error: e, message: 'Error when searching for book reviews.' });
  }
};

exports.findUserReviews = async function (req, res) {
  const render = req.query.render === "true";
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const reviews = await Review.findUserReviews(id, page, limit);

    if (render) {
      return res.render('includes/review_display', { reviews });
    }

    return res.json(reviews);
  } catch (e) {
    console.log(e)
    const message = 'Error when searching for user reviews.';
    if (render) {
      return res.render('404', { number: 400, message });
    }
    return res.status(400).json({ error: e, message });
  }
};

exports.delete = async function (req, res) {
  try {
    const { id } = req.params;

    const review = await Review.findById(id);
    if (!review) {
      throw new Error('Review not found');
    }

    await Review.delete(id);
    await Activity.delete(id, 'Review');

    res.status(200).json({ message: 'Review and activities deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

  
  