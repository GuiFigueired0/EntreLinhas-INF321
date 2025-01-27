const mongoose = require('mongoose');
const User = require('./UserModel');

const ConnectionSchema = new mongoose.Schema({
  follower: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
  },
});

async function updateUserCounter(follower, user, increment = true) {
  const follower_update = { $inc: { ['following_count']: increment ? 1 : -1 } };
  const user_update = { $inc: { ['followers_count']: increment ? 1 : -1 } };
  
  await User.findByIdAndUpdate(follower, follower_update);
  await User.findByIdAndUpdate(user, user_update);
}

ConnectionSchema.post('save', async function (doc) {
  await updateUserCounter(doc.follower, doc.user, true);
});

ConnectionSchema.post('remove', async function (doc) {
  await updateUserCounter(doc.follower, doc.user, false);
});

ConnectionSchema.index({ follower: 1, user: 1 }, { unique: true });

const ConnectionModel = mongoose.model('Connection', ConnectionSchema);

class Connection {
  constructor(data) {
    this.data = data;
  }

  async create() {
    return await ConnectionModel.create(this.data);
  }

  static async findUserConnections(follower, page = 1, limit = null) {
    if (limit) {
      const skip = (page - 1) * limit;
      return await ConnectionModel.find({ follower })
        .populate({ path: 'user', select: '_id name image_url' })
        .skip(skip)
        .limit(limit);
    }
    return await ConnectionModel.find({ follower }).populate({ path: 'user', select: '_id name image_url' })
  }

  static async findFollowers(user, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    return await ConnectionModel.find({ user })
      .populate({ path: 'follower', select: '_id name image_url' })
      .skip(skip)
      .limit(limit);
  }

  static async deleteConnection(connection_id) {
    const connection = await ConnectionModel.findByIdAndDelete(connection_id);
    connection.remove(); 

    return connection;
  }
}

module.exports = Connection;
