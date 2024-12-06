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
      type: FileModel,
    },
    createdDate: {
      type: Date,
      default: Date.now,
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
  photoGallery: {
    imageGallery: {
      type: [String],
    },
    imageCaptions: {
      type: [String],
    },
    createdDates: {
      type: [Date],
    },
  },
});

ParkTripSchema.statics.toAPI = (doc) => ({
  parkName: doc.parkName,
  digitalStampImage: doc.digitalStamp.image,
  digitalStampDate: doc.digitalStamp.visitedDate,
  tripDiaryEntries: doc.tripDiary.diaryEntries,
  photoGalleryImages: doc.photoGallery.imageGallery,
  photoGalleryCaptions: doc.photoGallery.imageCaptions,
});

const ParkTripModel = mongoose.model('ParkTrip', ParkTripSchema);
module.exports = ParkTripModel;
