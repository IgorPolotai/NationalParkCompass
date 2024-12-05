/* eslint-disable linebreak-style */
const helper = require('./helper.js');
const React = require('react');
const map = require('./main.js');

const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

const Favorites = (props) => {
    return (
    <div class="panel"> 
        <h2 class="panel-heading">Favorites</h2>
            <div id="favorites-list">
        </div>
    </div> 
    );
};

const ParkInfo = (props) => {
    return (
        <div class="has-background-info p-1">
		<div class="has-background-info p-1">
			<h2 id="details-1" class="panel-heading m-1">Info</h2>
			<div class="columns m-1">
				<div class="column is-one-third has-background-info-light mr-1">
					<div id="details-2">Click on a park to learn more about it</div>
					<div class="control">
						<button id="btn-favorite" class="button is-success m-1">
							Favorite
						</button>

						<button id="btn-delete" class="button is-warning m-1">
							Delete
						</button>
					</div>
				</div>
				<div class="column has-background-info-light">
					<h2 id="subtitle" class="subtitle is-size-6 has-text-weight-bold mb-1">Park Details</h2>
					<div id="details-3">???</div>
				</div>
			</div>
		</div>
	</div>
    );
};

const DigitalStamp = (props) => {
    return (
        <div class="column is-one-quarter has-background-info-light mr-1">
            <div id="digitalStamp"><b>Digital Stamp</b></div>
        </div>
    );
};

const TripDiary = (props) => {
    return (
        <div class="column has-background-info-light">
            <h2 class="subtitle is-size-6 has-text-weight-bold mb-1">Trip Diary</h2>
            <div id="diaryEntries">???</div>
        </div>
    );
};

const PhotoGallery = (props) => {
    return (
        <div class="has-background-info p-1">
		    <div class="has-background-info p-1">
			    <h2 class="panel-heading m-1">Photo Gallery</h2>
			    <div class="columns m-1">
				    <div class="column has-background-info-light mr-1">
					    <div id="digitalStamp"><b>Upload Your Photos Here!</b></div>
				    </div>
			    </div>
		    </div>
	    </div>
    )
};

const App = () => {
    // const [reloadDomos, setReloadDomos] = useState(false);

    return (
        <div>
	        <div class="columns m-1">
		        <div class="column is-two-thirds">
			    <div id="map"></div>
		    </div>

		    <div class="column">
			    <div class="panel">
				    <h2 class="panel-heading">Map Controls</h2>
				    <a id="btn1" class="panel-block">
					    <span class="panel-icon">
						    <i class="fas fa-map-location"></i>
					    </span>
					Alaska
				    </a>

				    <a id="btn2" class="panel-block">
					    <span class="panel-icon">
						    <i class="fas fa-cube"></i>
					    </span>
					    Hawaii
				    </a>

				    <a id="btn3" class="panel-block">
				    	<span class="panel-icon">
					    	<i class="fas fa-earth-america"></i>
					    </span>
					    Continental America
				    </a>
			    </div> 

            <div id="favoritesDiv">
                <Favorites />
            </div>

		</div>
	</div>

    <div id="parkInfoDiv">
        <ParkInfo />
    </div>

	<div class="has-background-info p-1">
		<div class="has-background-info p-1">
			<h2 class="panel-heading m-1">Record Your Trip</h2>
			<div class="columns m-1">

            <div id="digitalStampDiv">
                <DigitalStamp />
            </div>

            <div id="tripDiaryDiv">
                <TripDiary />
            </div>
			</div>
		</div>
	</div>

    <div id="photoGalleryDiv">
                <PhotoGallery />
            </div>
    </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render(<App />);
};

window.onload = init;