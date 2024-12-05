// Schemas needed:
// MapGeoData
// DigitalStamp
// TripDiary
// PhotoGallery

/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

// {
//   "type": "Feature",
//       "id" : "yellowstone",
//   "properties": {
//         "title": "Yellowstone National Park",
//         "subtitle": "The World's First National Park",
//         "description": "On March 1, 1872, Yellowstone became the first national park...",
//         "url": "https://www.nps.gov/yell",
//         "address": "2 Officers Row, Yellowstone National Park, WY 82190",
//         "phone": "(307) 344 7381",
//         "reason": "Geyser gaze."
//       },
//   "geometry": {
//     "coordinates": [
//     -110.588516,
//     44.423691
//     ],
//     "type": "Point"
//   }
// }

const MapGeoDataSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  properties: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
  },
  geometry: {
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

MapGeoDataSchema.statics.toAPI = (doc) => ({
  type: doc.type,
  id: doc.id,
  title: doc.properties.title,
  subtitle: doc.properties.subtitle,
  description: doc.properties.description,
  url: doc.properties.url,
  address: doc.properties.address,
  phone: doc.properties.phone,
  reason: doc.properties.reason,
  coordinates: doc.geometry.coordinates,
});

const MapGeoDataModel = mongoose.model('MapGeoData', MapGeoDataSchema);
module.exports = MapGeoDataModel;
