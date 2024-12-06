/* eslint-disable linebreak-style */
const models = require('../models');

const {
  Account, Filestore, ParkTrip,
} = models;

const mapPage = async (req, res) => res.render('app');

const getMap = async (req, res) => {

};

const getParkInfo = async (req, res) => {

};

const makeDigitalStamp = async (req, res) => {
  if (!req.files || !req.files.sampleFile) {
    return res.status(400).json({ error: 'No photo was submitted for the Digital Stamp!' });
  }

  if (!req.body.name || !req.body.visitDate) {
    return res.status(400).json({ error: 'No date and/or name was submitted for the Digital Stamp!' });
  }

  try {
    const digitalStamp = new Filestore(req.files);
    await digitalStamp.save();

    const digitalStampData = {
      name: req.body.name,
      visitDate: req.body.visitDate,
      image: digitalStamp,
      owner: req.session.account._id,
    };

    const newDigitalStamp = new DigitalStamp(digitalStampData);
    await newDigitalStamp.save();
    return res.status(201).json({
      name: newDigitalStamp.name,
      visitDate: newDigitalStamp.visitDate,
      image: newDigitalStamp.image,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occured creating the Digital Stamp!' });
  }
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
    const query = { owner: req.session.account._id, parkName: req.body.parkName };
    const docs = await ParkTrip.find(query).select('name images').lean().exec();

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
  };

  try {
    const newDiary = new ParkTrip(diaryData);
    await newDiary.save();
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
    const query = { owner: req.session.account._id, parkName: req.body.parkName };
    const docs = await ParkTrip.find(query).select('tripDiary').lean().exec();

    return res.json({ diary: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving the trip diary entry!' });
  }
};

module.exports = {
  mapPage,
  getMap,
  getParkInfo,
  makeDigitalStamp,
  getDigitalStamp,
  makeFavorites,
  getFavorites,
  makePhotoGallery,
  getPhotoGallery,
  makeTripDiary,
  getTripDiary,
};
