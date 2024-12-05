/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const FileModel = require('./Filestore.js');

const PhotoGallerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  images: {
    type: [FileModel],
    required: true,
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

PhotoGallerySchema.statics.toAPI = (doc) => ({
  name: doc.name,
  images: doc.images,
});

const PhotoGalleryModel = mongoose.model('PhotoGallery', PhotoGallerySchema);
module.exports = PhotoGalleryModel;
