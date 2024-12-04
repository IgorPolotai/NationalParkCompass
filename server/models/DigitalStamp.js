/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const FileModel = require('./Filestore.js');

const DigitalStampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  visitDate: {
    type: Date,
    required: true,
  },
  image: {
    type: FileModel,
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

DigitalStampSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  visitDate: doc.visitDate,
  image: doc.image,
});

const DigitalStampModel = mongoose.model('DigitalStamp', DigitalStampSchema);
module.exports = DigitalStampModel;
