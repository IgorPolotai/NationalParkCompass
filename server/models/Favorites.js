/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const FavoritesSchema = new mongoose.Schema({
  ids: {
    type: [String],
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
});

FavoritesSchema.statics.toAPI = (doc) => ({
  favorites: doc.ids,
});

const FavoritesModel = mongoose.model('Favorites', FavoritesSchema);
module.exports = FavoritesModel;
