/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const FileModel = require('./Filestore.js');

const ParkTripSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  parkName: {
    type: String,
    required: true,
    trim: true,
  },
  digitalStamp: {
    visitedDate: {
      type: Date,
    },
    image: {
      type: String,
      ref: FileModel,
    },
  },
  tripDiary: {
    diaryEntries: {
      type: [String],
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
});

ParkTripSchema.statics.toAPI = (doc) => ({
  parkName: doc.parkName,
  digitalStampImage: doc.digitalStamp.image,
  digitalStampDate: doc.digitalStamp.visitedDate,
  tripDiaryEntries: doc.tripDiary.diaryEntries,
});

const ParkTripModel = mongoose.model('ParkTrip', ParkTripSchema);
module.exports = ParkTripModel;
