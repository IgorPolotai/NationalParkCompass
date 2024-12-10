/* eslint-disable linebreak-style */
const helper = require('./helper.js');
const React = require('react');
const map = require('./main.js');
const geojson = require('./parks.json');

const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

// const ParkContext = createContext();

// const Favorites = (props) => {
//     return (
//         <div class="panel"> 
//             <h2 class="panel-heading">Favorites</h2>
//                 <div id="favorites-list">
//             </div>
//         </div> 
//     );

    // const [favList, setFavorites] = useState(props.favorites);

    // useEffect(() => {
    //    const loadFavoritesFromServer = async () => {
    //     try {
    //     const response = await fetch('/getFavorites');
    //     if (!response.ok) {
    //         throw new Error('Error fetching favorites');
    //     }
    //     const data = await response.json();
    //     setFavorites(data.favorites);
    //     } catch (error) {
    //         console.error('Error:', error);
    //     }
    //     };
    //    loadFavoritesFromServer();
    // }, []);       

    // if(favList.length === 0) {
    //     return (
    //     <div class="panel"> 
    //         <h2 class="panel-heading">Favorites</h2>
    //             <div id="favorites-list">
    //         </div>
    //     </div> 
    //     );
    // }

    // const favoriteNodes = favList.map(fav => {
    //     let currentFeature; 

    //     for (const feature of geojson.features) {
    //         if (feature.name == fav.name) {
    //           currentFeature = feature;
    //         }
    //     }     

    //     const handleClick = (e) => {
    //         e.preventDefault();
    //         map.showFeatureDetails(currentFeature.id);
    //         map.setZoomLevel(6);
    //         map.flyTo(currentFeature.geometry.coordinates);
    //     };

    //     return (
    //         <a className='panel-block' id={currentFeature.id} onClick={handleClick}>
    //           <span class="panel-icon">
    //               <i class="fas fa-map-pin"></i>
    //           </span>
    //           {currentFeature.properties.title}
    //         </a>
    //     );
    // });
    
    // return (
    //     <div class="panel"> 
    //         <h2 class="panel-heading">Favorites</h2>
    //             <div id="favorites-list">{favoriteNodes}
    //         </div>
    //     </div> 
    // );
// };

const ReloadWatcher = (props) => {
    const [parkName, setParkName] = useState('none');
    map.registerUpdateParkName(setParkName);

    return (
        <div>
            <p>CURRENT PARK NAME: {parkName}</p>
        </div>
    );
};

const ParkInfo = ( props ) => {
    // const [noParkSelected, setParkSelected] = useState(true);
    
    // if (noParkSelected) {
    //     return (
    //         <div></div>
    //     );
    // };
    
    if ( map.isNoParkSelected ) { //Displays this at the beginning
        return (
            <div class="has-background-info p-1">
            <div class="has-background-info p-1">
                <h2 id="details-1" class="panel-heading m-1">Info</h2>
                <div class="columns m-1">
                    <div class="column is-one-third has-background-info-light mr-1">
                        <div id="details-2">Click on a park to learn more about it!</div>
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
                        <div id="details-3">Click on a park to learn all about it!</div>
                    </div>
                </div>
            </div>
        </div>
        );
    };
    
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

const DigitalStamp = ( props ) => {    
    // const [noParkSelected, setParkSelected] = useState(true);
    
    // if (noParkSelected) {
    //     return (
    //         <div></div>
    //     );
    // };

    // if ( noParkSelected ) {
    //     return (
    //         <div></div>
    //     );
    // }
    
    return (
        <div class="column is-one-quarter has-background-info-light mr-1">
            <div id="digitalStamp"><b>Digital Stamp</b></div>
        </div>
    );
};

const TripDiary = ( props ) => {
    // if ( noParkSelected ) {
    //     return (
    //         <div></div>
    //     );
    // }

    return (
        <div class="column has-background-info-light">
            <h2 class="subtitle is-size-6 has-text-weight-bold mb-1">Trip Diary</h2>
            <div id="diaryEntries">???</div>
        </div>
    );
};

const PhotoGallery = ( props ) => {
    // if ( noParkSelected ) {
    //     return (
    //         <div></div>
    //     );
    // }
    
    return (
        <div class="has-background-info p-1">
		    <div class="has-background-info p-1">
			    <h2 class="panel-heading m-1">Photo Gallery</h2>
			    <div class="columns m-1">
				    <div class="column has-background-info-light mr-1">
					    <div id="photoGallery"><b>See your park photos here!</b></div>
				    </div>
			    </div>
		    </div>
	    </div>
    )
};

const DataForm = (props) => {
    const [image, setImage] = useState(null);
    const [visitedDate, setVisitedDate] = useState('');
    const [isDigitalStamp, setIsDigitalStamp] = useState(false);
    const [tripDiary, setTripDiary] = useState('');
    const [uploading, setUploading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    let parkName = document.getElementById('details-1');
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(file);
      }
    };
  
    const handleCheckboxChange = (e) => {
      setIsDigitalStamp(e.target.checked);
    };
  
    const handleDiaryChange = (e) => {
      setTripDiary(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!image || !parkName || !visitedDate) {
        setErrorMessage('Please fill all fields and upload an image.');
        return;
      }
  
      setUploading(true);
      setErrorMessage('');
  
      const formData = new FormData();
      formData.append('image', image);
      formData.append('parkName', parkName);
  
      try {
        // Upload image and add it to the gallery
        const photoRes = await fetch('/makePhotoGallery', {
          method: 'POST',
          body: formData,
        });
  
        if (!photoRes.ok) {
          throw new Error('Failed to upload photo');
        }
  
        // If the user selected the checkbox, set the uploaded image as the digital stamp
        if (isDigitalStamp) {
          const digitalStampData = {
            visitedDate,
            parkName,
          };
  
          const digitalStampRes = await fetch('/makeDigitalStamp', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(digitalStampData),
          });
  
          if (!digitalStampRes.ok) {
            throw new Error('Failed to set digital stamp');
          }
        }
  
        // Submit the trip diary entry
        if (tripDiary) {
          const diaryData = {
            entry: tripDiary,
            parkName,
          };
  
          const diaryRes = await fetch('/makeTripDiary', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(diaryData),
          });
  
          if (!diaryRes.ok) {
            throw new Error('Failed to add diary entry');
          }
        }
  
        setImage(null);
        setVisitedDate('');
        setTripDiary('');
        setIsDigitalStamp(false);
  
      } catch (err) {
        console.error('Error uploading data:', err);
        setErrorMessage('An error occurred while uploading data.');
      } finally {
        setUploading(false);
      }
    };
  
    return (
      <div className="has-background-info p-1">
        <div className="has-background-info p-1">
          <h2 className="panel-heading m-1">Upload Your Content Here!</h2>
          <div className="columns m-1">
            <div className="column has-background-info-light mr-1">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="imageUpload">Choose a photo:</label>
                  <input
                    type="file"
                    id="imageUpload"
                    onChange={handleFileChange}
                    accept="image/*"
                    required
                  />
                </div>
  
                <div>
                  <label htmlFor="visitedDate">Visited Date:</label>
                  <input
                    type="date"
                    id="visitedDate"
                    value={visitedDate}
                    onChange={(e) => setVisitedDate(e.target.value)}
                    required
                  />
                </div>
  
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={isDigitalStamp}
                      onChange={handleCheckboxChange}
                    />
                    Set this photo as your digital stamp for this park
                  </label>
                </div>
  
                <div>
                  <label htmlFor="tripDiary">Trip Diary Entry:</label>
                  <textarea
                    id="tripDiary"
                    value={tripDiary}
                    onChange={handleDiaryChange}
                    placeholder="Write a diary entry"
                  />
                </div>
  
                <div>
                  {errorMessage && <p className="error">{errorMessage}</p>}
                  <button type="submit" disabled={uploading}>
                    {uploading ? 'Uploading...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };


const App = () => {
    // const [reloadDomos, setReloadDomos] = useState(false);
    const [noParkSelected, setParkSelected] = useState(true);

    useEffect(() => {
        const createMap = async () => {
            map.init();
        };

        createMap();
    }, []);

    return (
    <div>
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

        <div id="dataFormDiv">
                <DataForm />
        </div>

        <div>
            <ReloadWatcher />
        </div>
    </div>
    );
};

const init = async () => {
    const root = createRoot(document.getElementById('app'));
    await root.render(<App />);

    //Function to upgrade to Premium
    document.getElementById('bannerAdLink').addEventListener("click", (e) => {  
        e.preventDefault();
        document.getElementById('title').innerHTML = 'National Park Compass Premium';
        document.getElementById('bannerAd').remove();
    });

    map.loadFavorites();
    map.refreshFavorites();
};

window.onload = init;
