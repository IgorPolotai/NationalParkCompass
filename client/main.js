/* eslint-disable linebreak-style */
const map = require('./map.js');
const geojson = require('./parks.json');

// I. Variables & constants
// NB - it's easy to get [longitude,latitude] coordinates with this tool: http://geojson.io/
const lnglatAlaska = [-154.4931, 63.5888];
const lnglatHawaii = [-155.844437, 19.741755];
const lnglatUSA = [-98.5696, 39.8282];
// let favoriteIds = ["p20","p79","p180","p43"];
let favoriteIds = [];
let currentId = '';

// PASS PARK NAME TO REACT HERE
let updateParkName;

const registerUpdateParkName = (updateFunc) => {
  updateParkName = updateFunc;
};

// II. Functions

// Sets up the Map Control buttons, the favorite/delete buttons, and then calls other functions
const setupUI = () => {
  // Alaska
  document.querySelector('#btn1').onclick = () => {
    map.setZoomLevel(3.5);
    map.setPitchAndBearing(0, 0);
    map.flyTo(lnglatAlaska);
  };
  // Hawaii
  document.querySelector('#btn2').onclick = () => {
    map.setZoomLevel(5.2);
    map.setPitchAndBearing(0, 0);
    map.flyTo(lnglatHawaii);
  };
  // World zoom 0
  document.querySelector('#btn3').onclick = () => {
    map.setZoomLevel(3);
    map.setPitchAndBearing(0, 0);
    map.flyTo(lnglatUSA);
  };

  document.querySelector('#btn-favorite').onclick = async () => {
    favoriteIds.push(currentId);
    // const parkName = document.getElementById('details-1').textContent;

    try {
      const response = await fetch('/makeFavorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ parkName: currentId }),
      });

      if (!response.ok) {
        throw new Error('Error adding to favorites');
      }
    } catch (error) {
      console.error('Error:', error);
    }

    refreshFavorites();
    updateButtons(currentId);
  };

  document.querySelector('#btn-delete').onclick = async () => {
    // const parkName = document.getElementById('details-1').textContent;

    for (let i = 0; i < favoriteIds.length; i++) {
      if (favoriteIds[i] === currentId) {
        favoriteIds.splice(i, 1);

        try {
          // eslint-disable-next-line no-await-in-loop
          const response = await fetch('/deleteFavorites', {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ parkName: currentId }),
          });

          if (!response.ok) {
            throw new Error('Error deleting');
          }
        } catch (error) {
          console.error('Error:', error);
        }

        refreshFavorites();
        updateButtons(currentId);

        return;
      }
    }
  };

  // loadFavorites();
  updateButtons(currentId);
};

// Loads the list of favorited parks from local storage
const loadFavorites = async () => {
  try {
    const response = await fetch('/getFavorites');
    if (!response.ok) {
      throw new Error('Error fetching favorites');
    }
    const data = await response.json();
    console.log("Favorite Data from Server: " + data.favorites);
    favoriteIds = data.favorites;
    refreshFavorites();
  } catch (error) {
    console.error('Error:', error);
  }
};

// Refreshes the list of favorite parks whenever something is changed or loaded
const refreshFavorites = () => {
  const favoritesContainer = document.querySelector('#favorites-list');
  favoritesContainer.innerHTML = '';
  for (const id of favoriteIds) {
    favoritesContainer.appendChild(createFavoriteElement(id));
  }
};

// Formats the list for the favorited parks
const createFavoriteElement = (id) => {
  const feature = getFeatureById(id);

  console.log(feature);

  const a = document.createElement('a');
  a.className = 'panel-block';
  a.id = feature.id;
  a.onclick = () => {
    showFeatureDetails(a.id);
    map.setZoomLevel(6);
    map.flyTo(feature.geometry.coordinates);
  };
  a.innerHTML = `
		<span class="panel-icon">
			<i class="fas fa-map-pin"></i>
		</span>
		${feature.properties.title}
	`;
  return a;
};

// Returns an object from a JSON based on a passed in ID
const getFeatureById = (id) => {
  for (const feature of geojson.features) {
    if (feature.id == id) {
      return feature;
    }
  }
};

// Returns true if an object with the passed in id exists in the list of favorited parks
const isInFavorites = (id) => {
  for (const favId of favoriteIds) {
    if (favId == id) {
      return true;
    }
  }

  return false;
};

// Changes what buttons are active based on what is the currently selected park,
// and whether it is currently selected
const updateButtons = (id) => {
  const favBtn = document.querySelector('#btn-favorite');
  const delBtn = document.querySelector('#btn-delete');

  if (id == '') { // done only when nothing has been selected
    favBtn.style.display = 'none';
    delBtn.style.display = 'none';
  } else if (isInFavorites(id)) {
    favBtn.style.display = 'none';
    delBtn.style.display = 'block';
  } else {
    favBtn.style.display = 'block';
    delBtn.style.display = 'none';
  }
};

// Updates park info based on what park you chose
const showFeatureDetails = (id) => {
  // console.log(`showFeatureDetails - id=${id}`);

  updateParkName(document.getElementById('details-1').textContent);

  const feature = getFeatureById(id);
  document.querySelector('#details-1').innerHTML = `${feature.properties.title}`;
  document.querySelector('#details-2').innerHTML =		`<b>Address: </b>${feature.properties.address}<br>
		<b>Phone: </b><a href="tel:${feature.properties.phone}">${feature.properties.phone}</a><br>
		<b>Website: </b><a href="${feature.properties.url}">${feature.properties.url}</a>`;
  document.querySelector('#subtitle').innerHTML = `${feature.properties.subtitle}`;
  document.querySelector('#details-3').innerHTML = `${feature.properties.description}`;

  currentId = id;

  const event = new CustomEvent('parkSelected', { detail: { selected: false } });
  window.dispatchEvent(event);

  updateButtons(currentId);
};

// Sets up the Mapbox and downloads geojson
// Use async/await in init function
const init = async () => {
  try {
    // Initialize the map and set its zoom level
    map.initMap(lnglatUSA);
    map.setZoomLevel(3);

    // Await the download of the geojson file
    // const geojsonData = await ajax.downloadFile('./parks.geojson');

    // Parse the geojson data
    // geojson = JSON.parse(geojson);

    // console.log(`Features: ${geojson.features}`);

    // After geojson is loaded, add markers and refresh the favorites
    map.addMarkersToMap(geojson, showFeatureDetails);
    setupUI(); // Setup UI after geojson is loaded

    // Refresh the favorites now that geojson is available
    loadFavorites();
    refreshFavorites();

    updateParkName(document.getElementById('details-1').textContent);

  } catch (error) {
    console.error('Error during initialization:', error);
  }
};

module.exports = {
  init,
  loadFavorites,
  registerUpdateParkName,
  refreshFavorites,
};
