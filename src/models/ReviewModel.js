const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  book_id: { type: Number, required: true },
  rating: { type: Number, default: null },
  text: { type: String, default: null },
  curtidas: { type: Number, default: 0 },
  finished: { type: Boolean, default: true }, 
  last_alteration_day: { type: Number, default: null },
  last_alteration_month: { type: Number, default: null },
  last_alteration_year: { type: Number, default: null },
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

ReviewSchema.virtual('formattedDate').get(function () {
  const day = this.last_alteration_day;
  const month = this.last_alteration_month;
  const year = this.last_alteration_year;
  
  if (!day || !month || !year) return null;
  
  const monthNames = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];
  
  return `${day} de ${monthNames[month - 1]} de ${year}`;
});

const ReviewModel = mongoose.model('Review', ReviewSchema);

class Review {
  constructor(data) {
    this.data = data;
  }

  async create() {
    return await ReviewModel.create(this.data);
  }

  static async findById(review_id) {
    return await ReviewModel.findById(review_id);
  }

  static async findBookReviews(book_id, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await ReviewModel.find({ book_id }).skip(skip).limit(limit);
  }

  static async findUserReviews(user_id, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await ReviewModel.find({ user_id }).skip(skip).limit(limit);
  }

  static async updateById(review_id, data) {
    return await ReviewModel.findByIdAndUpdate(review_id, data, { new: true });
  }  

  static async findBasicInfo(review_id) {
    return await ReviewModel.findById(review_id).select('book_id user_id rating');
  }  
}

module.exports = Review;