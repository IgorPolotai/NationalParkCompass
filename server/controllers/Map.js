/* eslint-disable linebreak-style */
const models = require('../models');

const {
  DigitalStamp, Favorites, Filestore, MapGeoData, PhotoGallery, TripDiary,
} = models;

const mapPage = async (req, res) => res.render('app');

const getMap = async (req, res) => {

};

const makeDigitalStamp = async (req, res) => {

};

const getDigitalStamp = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await DigitalStamp.find(query).select('name visitDate image').lean().exec();

    return res.json({ digitalStamp: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving the digital stamp!' });
  }
};

const makeFavorites = async (req, res) => {

};

const getFavorites = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Favorites.find(query).select('ids').lean().exec();

    return res.json({ favorites: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving favorites!' });
  }
};

const makePhotoGallery = async (req, res) => {

};

const getPhotoGallery = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await PhotoGallery.find(query).select('name images').lean().exec();

    return res.json({ images: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving the photo gallery images!' });
  }
};

const makeTripDiary = async (req, res) => {
  if (!req.body.diary) {
    return res.status(400).json({ error: 'No entry was submitted to this park\'s Trip Diary.' });
  }

  const diaryData = {
    diary: req.body.diary,
    owner: req.session.account._id,
  };

  try {
    const newDiary = new TripDiary(diaryData);
    await newDiary.save();
    // return res.json({ redirect: '/maker' });
    return res.status(201).json({ diary: newDiary.diary });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Diary already exists!' });
    }
    return res.status(500).json({ error: 'An error occured making the Trip Diary!' });
  }
};

const getTripDiary = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await TripDiary.find(query).select('diary').lean().exec();

    return res.json({ diary: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving the trip diary entry!' });
  }
};

module.exports = {
  mapPage,
  getMap,
  makeDigitalStamp,
  getDigitalStamp,
  makeFavorites,
  getFavorites,
  makePhotoGallery,
  getPhotoGallery,
  makeTripDiary,
  getTripDiary,
};
