const mongoose = require('mongoose');
const Review = require('./ReviewModel');
const BookState = require('./BookStateModel');
const ReadingHistory = require('./ReadingHistoryModel');
const Connection = require('./ConnectionModel');

const ActivitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  data_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['BookState', 'Review', 'ReadingHistory']
  },
  timestamp: { type: Date, default: Date.now }
});

const ActivityModel = mongoose.model('Activity', ActivitySchema);

class Activity {
  constructor(data) {
    this.data = data;
  }

  async create() {
    return await ActivityModel.create(this.data);
  } 
  
  static async delete(data_id, type) {
    return await ActivityModel.deleteMany({ data_id, type });
  }

  static async getUserFeed(user, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
  
      const activities = await ActivityModel.find({ user })
        .populate({ path: 'user', select: '_id username image_url' })
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
  
      const enrichedActivities = await Promise.all(
        activities.map(async (activity) => {
          try {
            let data;
            switch (activity.type) {
              case 'BookState':
                data = await BookState.findById(activity.data_id);
                break;
              case 'Review':
                data = await Review.findById(activity.data_id);
                break;
              case 'ReadingHistory':
                data = await ReadingHistory.findById(activity.data_id);
                break;
              default:
                data = null;
            }
            return { activity, data };
          } catch (error) {
            return { activity, data: null, error: error.message };
          }
        })
      );
  
      return enrichedActivities;
    } catch (error) {
      throw new Error('Error fetching user feed');
    }
  }
  
  static async getFollowedFeed(user, page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const connections = await Connection.findUserConnections(user);
      const userIds = connections.map(connection => connection.user._id);
      const activities = await ActivityModel.find({ user: { $in: userIds } })
        .populate({ path: 'user', select: '_id username image_url' })
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit)
        .lean();
  
      const enrichedActivities = await Promise.all(
        activities.map(async (activity) => {
          try {
            let data;
            switch (activity.type) {
              case 'BookState':
                data = await BookState.findById(activity.data_id);
                break;
              case 'Review':
                data = await Review.findById(activity.data_id);
                break;
              case 'ReadingHistory':
                data = await ReadingHistory.findById(activity.data_id);
                break;
              default:
                data = null;
            }
            return { activity, data };
          } catch (error) {
            return { activity, data: null, error: error.message };
          }
        })
      );
  
      return enrichedActivities;
    } catch (error) {
      throw new Error('Error when searching for feed of followed users');
    }
  }  
}

module.exports = Activity;