/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const TripDiarySchema = new mongoose.Schema({
  diary: {
    type: String,
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

TripDiarySchema.statics.toAPI = (doc) => ({
  diary: doc.diary,
});

const TripDiaryModel = mongoose.model('TripDiary', TripDiarySchema);
module.exports = TripDiaryModel;
