const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  image_url: { type: String, default: 'https://mdbcdn.b-cdn.net/img/new/avatars/2.webp' },
  quote: { type: String, default: '' },
  bookshelves: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Bookshelf' 
  }],
  read_count: { type: Number, default: 0 },
  want_to_read_count: { type: Number, default: 0 },
  currently_reading_count: { type: Number, default: 0 },
  abandoned_count: { type: Number, default: 0 },
  followers_count: { type: Number, default: 0 },
  following_count: { type: Number, default: 0 },
  reviews_count: { type: Number, default: 0 },
});

const UserModel = mongoose.model('User', UserSchema);

class User {
  constructor(data) {
    this.data = data;
  }

  async create() {
    return await UserModel.create(this.data);
  }
  
  async delete() {
    return await UserModel.findOneAndDelete({ username: this.data.username });
  }

  static async findById(userId) {
    return await UserModel.findById(userId);
  }
  
  static async updateById(userId, updatedData) {
    return await UserModel.findByIdAndUpdate(userId, updatedData, { new: true });
  }  

  static async findByIdAndUpdate(userId, query) {
    return await UserModel.findByIdAndUpdate(userId, query);
  }  

  static async searchByUsername(partialUsername, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await UserModel.find({ username: { $regex: partialUsername, $options: 'i' } }).select('_id username image_url').skip(skip).limit(limit);
  }
}

module.exports = User;