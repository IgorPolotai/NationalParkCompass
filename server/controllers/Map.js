/* eslint-disable linebreak-style */
const models = require('../models');

const {
  Account, Filestore, ParkTrip,
} = models;

const mapPage = async (req, res) => res.render('app');

const makeDigitalStamp = async (req, res) => {
  if (!req.body.visitedDate || !req.files || !req.files.image) {
    return res.status(400).json({ error: 'The visited date and image are required!' });
  }

  try {
    const file = req.files.image;
    const newFile = new Filestore({
      name: file.name,
      data: file.data,
      size: file.size,
      mimetype: file.mimetype,
      parkName: req.body.parkName,
      owner: req.session.account._id,
    });

    await newFile.save();

    const parkTrip = await ParkTrip.findOne({
      owner: req.session.account._id,
      parkName: req.body.parkName,
    });

    if (!parkTrip) {
      return res.status(404).json({ error: 'Park trip not found!' });
    }

    parkTrip.digitalStamp = {
      visitedDate: new Date(req.body.visitedDate),
      image: newFile._id,
    };

    await parkTrip.save();

    return res.status(200).json({
      parkName: parkTrip.parkName,
      visitDate: parkTrip.digitalStamp.visitedDate,
      image: parkTrip.digitalStamp.image,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'An error occurred updating the Digital Stamp!' });
  }
};

const getDigitalStamp = async (req, res) => {
  if (!req.query.parkName) {
    return res.status(400).json({ error: 'Park name is required!' });
  }

  try {
    const parkTrip = await ParkTrip.findOne({
      owner: req.session.account._id,
      parkName: req.query.parkName,
    }).lean();

    if (!parkTrip) {
      return res.status(404).json({ error: 'Park trip not found!' });
    }

    return res.json({
      parkName: parkTrip.parkName,
      visitDate: parkTrip.digitalStamp.visitedDate,
      image: parkTrip.digitalStamp.image,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving the Digital Stamp!' });
  }
};

const makeFavorites = async (req, res) => {
  if (!req.body.parkName) {
    return res.status(400).json({ error: 'Park name is required!' });
  }

  try {
    const account = await Account.findOne({ _id: req.session.account._id });

    if (!account) {
      return res.status(404).json({ error: 'Account not found!' });
    }

    if (account.favorites.includes(req.body.parkName)) {
      return res.status(400).json({ error: 'This park is already in your favorites!' });
    }

    account.favorites.push(req.body.parkName);

    await account.save();

    return res.status(200).json({ message: 'Park added to favorites!', favorites: account.favorites });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error adding park to favorites!' });
  }
};

const deleteFavorites = async (req, res) => {
  if (!req.body.parkName) {
    return res.status(400).json({ error: 'Park name is required!' });
  }

  try {
    const account = await Account.findOne({ _id: req.session.account._id });

    if (!account) {
      return res.status(404).json({ error: 'Account not found!' });
    }

    if (!account.favorites.includes(req.body.parkName)) {
      return res.status(400).json({ error: 'This park not in your favorites!' });
    }

    account.favorites.splice(account.favorites.indexOf(req.body.parkName), 1);

    await account.save();

    return res.status(200).json({ message: 'Park added to favorites!', favorites: account.favorites });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error adding park to favorites!' });
  }
};

const getFavorites = async (req, res) => {
  try {
    const account = await Account.findOne({ _id: req.session.account._id }).lean();

    if (!account) {
      return res.status(404).json({ error: 'Account not found!' });
    }

    return res.json({ favorites: account.favorites });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving favorites!' });
  }
};

const makePhotoGallery = async (req, res) => {
  if (!req.files || !req.files.image || !req.body.parkName) {
    return res.status(400).json({ error: 'File and park name are required!' });
  }

  try {
    const file = req.files.image;
    const newFile = new Filestore({
      name: file.name,
      data: file.data,
      size: file.size,
      mimetype: file.mimetype,
      parkName: req.body.parkName,
      owner: req.session.account._id,
    });

    await newFile.save();

    return res.status(201).json({
      message: 'Photo added to gallery!',
      photo: {
        name: newFile.name,
        size: newFile.size,
        mimetype: newFile.mimetype,
        parkName: newFile.parkName,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error uploading photo!' });
  }
};

const getPhotoGallery = async (req, res) => {
  if (!req.query.parkName) {
    return res.status(400).json({ error: 'Park name is required!' });
  }

  try {
    const photos = await Filestore.find({
      owner: req.session.account._id,
      parkName: req.query.parkName,
    }).lean();

    if (photos.length === 0) {
      return res.status(404).json({ error: 'No photos found for this park!' });
    }

    return res.json({
      photos: photos.map((photo) => ({
        name: photo.name,
        size: photo.size,
        mimetype: photo.mimetype,
        parkName: photo.parkName,
      })),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving photos!' });
  }
};

const makeTripDiary = async (req, res) => {
  if (!req.body.entry || !req.body.parkName) {
    return res.status(400).json({ error: 'Entry and park name are required!' });
  }

  try {
    const parkTrip = await ParkTrip.findOne({
      owner: req.session.account._id,
      parkName: req.body.parkName,
    });

    if (!parkTrip) {
      return res.status(404).json({ error: 'Park trip not found!' });
    }

    parkTrip.tripDiary.diaryEntries.push(req.body.entry);

    await parkTrip.save();

    return res.status(200).json({ message: 'Diary entry added successfully!' });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error adding diary entry!' });
  }
};

const getTripDiary = async (req, res) => {
  if (!req.query.parkName) {
    return res.status(400).json({ error: 'Park name is required!' });
  }

  try {
    const parkTrip = await ParkTrip.findOne({
      owner: req.session.account._id,
      parkName: req.query.parkName,
    }).lean();

    if (!parkTrip) {
      return res.status(404).json({ error: 'Park trip not found!' });
    }

    return res.json({ diaryEntries: parkTrip.tripDiary.diaryEntries });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving diary entries!' });
  }
};

module.exports = {
  mapPage,
  makeDigitalStamp,
  getDigitalStamp,
  makeFavorites,
  deleteFavorites,
  getFavorites,
  makePhotoGallery,
  getPhotoGallery,
  makeTripDiary,
  getTripDiary,
};
