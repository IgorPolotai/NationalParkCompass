/* eslint-disable linebreak-style */
// I. Variables & constants
const accessToken = 'pk.eyJ1IjoiaWdvcnBvbG90YWkiLCJhIjoiY2x1aXgwNDkyMDlnazJrbno1eTIyZzc3MCJ9.onySVVFPyznSFfHnQHvwZw';
let map;
let geojson;

// An example of how our GeoJSON is formatted
// This will be replaced by the GeoJSON loaded from parks.geojson
// geojson = {
// 	type: "FeatureCollection",
// 	features: [{
// 		"type": "Feature",
// 		"id": "p79",
// 		"properties": {
// 			"title": "Letchworth State Park",
// 			"description": "Letchworth State Park, renowned as the \"Grand Canyon of the East,\".",
// 			"url": "https://parks.ny.gov/parks/letchworth",
// 			"address": "1 Letchworth State Park, Castile, NY 14427",
// 			"phone": "(585) 493-3600"
// 		},
// 		"geometry": {
// 			"coordinates": [
// 				-78.051170,
// 				42.570148
// 			],
// 			"type": "Point"
// 		}
// 	}]
// };

// II. "private" - will not be exported

// Sets up the Mapbox and some of the controls
const initMap = (center) => {
  mapboxgl.accessToken = accessToken;

  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/outdoors-v12',
    center,
    zoom: 5.2,
  });
  map.addControl(new mapboxgl.NavigationControl({ showCompass: false }));

  // test
  // const clickHandler = (id) => alert(`${id} was clicked!`);
  // addMarker(geojson.features[0], "poi", clickHandler);
};

// Adds a marker to the Mapbox with a popup of information if you click on it
const addMarker = (feature, className, clickHandler) => {
  // A. Create a map marker using feature (i.e. "Park") data
  // - the marker is a <div>
  // - <div> className will be a 'poi' - see default-styles.css to see the details
  // - note that we give the <div> the id of "feature"

  const el = document.createElement('div');
  el.className = className;
  el.id = feature.id;
  // eslint-disable-next-line no-undef
  el.style.backgroundImage = `url(../images/park-photos/${feature.id}.jpg)`;
  el.style.backgroundSize = 'cover';
  el.style.width = '50px';
  el.style.height = '50px';
  el.style.borderRadius = '50%';

  // B. This is the HTML for the Popup
  const html = `
	<b>${feature.properties.title}</b>
	<p>${feature.properties.address}</p>
	<p><b>Phone: </b>${feature.properties.phone}</p>
	<p><b>Why Go: </b>${feature.properties.reason}</p>
	`;

  // C. Make the marker, add a popup, and add to map
  const marker = new mapboxgl.Marker(el)
    .setLngLat(feature.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 10 })
      .setHTML(html))
    .addTo(map);

  // D. Call this method when marker is clicked on
  el.addEventListener('click', () => clickHandler(marker._element.id));
};

// III. "public" - will be exported

// Flies to a coordinate
const flyTo = (center = [0, 0]) => {
  // https://docs.mapbox.com/mapbox-gl-js/api/#map#flyto
  map.flyTo({ center });
};

// Sets zoom based on passed in value
const setZoomLevel = (value = 0) => {
  // https://docs.mapbox.com/help/glossary/zoom-level/
  map.setZoom(value);
};

// Sets pitch and bearing based on passed in values
const setPitchAndBearing = (pitch = 0, bearing = 0) => {
  // https://docs.mapbox.com/mapbox-gl-js/example/live-update-feature/
  // https://docs.mapbox.com/mapbox-gl-js/example/set-perspective/
  map.setPitch(pitch);
  map.setBearing(bearing);
};

// Takes the JSON data and creates markers for each item
const addMarkersToMap = (json, clickHandler) => {
  geojson = json; // replaces the default hard coded JSON data

  // loop through the features array and for each one add a marker to the map
  for (const feature of geojson.features) {
    addMarker(feature, 'poi', clickHandler);
  }
};

export {
  initMap, flyTo, setZoomLevel, setPitchAndBearing, addMarkersToMap,
};
