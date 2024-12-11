/* eslint-disable linebreak-style */
const helper = require('./helper.js');
const React = require('react');
const map = require('./main.js');
const geojson = require('./parks.json');

const { useState, useEffect } = React;
const { createRoot } = require('react-dom/client');

let currentPark = "none";

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

// const ReloadWatcher = (props) => {
//     const [parkName, setParkName] = useState('none');
//     map.registerUpdateParkName(setParkName);
//     currentPark = parkName;

//     console.log("RELOAD PARK: " + parkName);
    
//     if ( parkName === "Info" ) {
//         return (
//             <div></div>
//         );
//     }

//     return (
//         <div>
//             <p>CURRENT PARK NAME: {parkName}</p>
//         </div>
//     );
// };

const ParkInfo = ( props ) => {
    const [parkName, setParkNameParkInfo] = useState('none');
    map.registerUpdateParkName(setParkNameParkInfo);
    
    if ( parkName === "Info" ) { 
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

// const DigitalStamp = ( props ) => {    
//     const [parkNameStamp, setParkNameDigitalStamp] = useState('none');
//     map.registerUpdateParkName(setParkNameDigitalStamp);

//     if ( parkNameStamp === "Info" ) {
//         return (
//             <div></div>
//         );
//     }
    
//     return (
//         <div class="column is-one-quarter has-background-info-light mr-1">
//             <div id="digitalStamp"><b>Digital Stamp</b></div>
//         </div>
//     );
// };

const TripDiary = ( props ) => {
    const [diary, setDiary] = useState(props.diary);

    useEffect(() => {
       const loadDiaryFromServer = async () => {
        const response = await fetch('/getTripDiary');
        const data = await response.json();
        setDiary(data.diaryEntries);
       };

       loadDiaryFromServer();
    }, [props.reloadDiary]);

    console.log("Diary Array: " + diary);

    if(diary === undefined) {
        return (
            <div class="column has-background-info-light">
                <h2 class="subtitle is-size-6 has-text-weight-bold mb-1">Trip Diary</h2>
                <div id="diaryEntries">Nothing yet! Record your memories!</div>
            </div>
        );
    }

    const diaryEntries = diary.map(diaryEntry => {
        return (
            <div className="singleEntry">
                {diaryEntry}
                <br />
            </div>
        );
    });

    return (
        <div class="column has-background-info-light">
            <h2 class="subtitle is-size-6 has-text-weight-bold mb-1">Trip Diary</h2>
            <div id="diaryEntries">{diaryEntries}</div>
        </div>
    );
};

// const PhotoGallery = ( props ) => {
//     const [parkName, setParkName] = useState('Info');
//     map.registerUpdateParkName(setParkName);
    
//     if ( parkName === "Info" ) {
//         return (
//             <div></div>
//         );
//     }
    
//     return (
//         <div class="has-background-info p-1">
// 		    <div class="has-background-info p-1">
// 			    <h2 class="panel-heading m-1">Photo Gallery</h2>
// 			    <div class="columns m-1">
// 				    <div class="column has-background-info-light mr-1">
// 					    <div id="photoGallery"><b>See your park photos here!</b></div>
// 				    </div>
// 			    </div>
// 		    </div>
// 	    </div>
//     )
// };

// const OldDataForm = (props) => {
//     // if (currentPark === "none") {
//     //     return <div></div>;
//     // }

//     const [tripDiary, setTripDiary] = useState('');
//     const [visitedDate, setVisitedDate] = useState('');
//     const [errorMessage, setErrorMessage] = useState('');
//     const [uploading, setUploading] = useState(false);

//     const handleDiaryChange = (e) => {
//         setTripDiary(e.target.value);
//     };

//     const handleVisitedDateChange = (e) => {
//         setVisitedDate(e.target.value);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!visitedDate || !tripDiary) {
//             setErrorMessage('Please fill in both the visited date and your diary entry.');
//             return;
//         }

//         setUploading(true);
//         setErrorMessage('');

//         try {
//             const diaryData = {
//                 entry: tripDiary,
//                 visitedDate,
//                 parkName: currentPark,
//             };

//             const diaryRes = await fetch('/makeTripDiary', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(diaryData),
//             });

//             if (!diaryRes.ok) {
//                 throw new Error('Failed to add diary entry');
//             }

//             // Reset the form after submission
//             setTripDiary('');
//             setVisitedDate('');

//         } catch (err) {
//             console.error('Error uploading data:', err);
//             setErrorMessage('An error occurred while submitting your diary entry.');
//         } finally {
//             setUploading(false);
//         }
//     };

//     return (
//         <div className="has-background-info p-1">
//             <div className="has-background-info p-1">
//                 <h2 className="panel-heading m-1">Upload Your Trip Diary</h2>
//                 <div className="columns m-1">
//                     <div className="column has-background-info-light mr-1">
//                         <form onSubmit={handleSubmit}>
//                             <div>
//                                 <label htmlFor="visitedDate">Visited Date:</label>
//                                 <input
//                                     type="date"
//                                     id="visitedDate"
//                                     value={visitedDate}
//                                     onChange={handleVisitedDateChange}
//                                     required
//                                 />
//                             </div>

//                             <div>
//                                 <label htmlFor="tripDiary">Trip Diary Entry:</label>
//                                 <textarea
//                                     id="tripDiary"
//                                     value={tripDiary}
//                                     onChange={handleDiaryChange}
//                                     placeholder="Write a diary entry"
//                                     required
//                                 />
//                             </div>

//                             <div>
//                                 {errorMessage && <p className="error">{errorMessage}</p>}
//                                 <button type="submit" disabled={uploading}>
//                                     {uploading ? 'Submitting...' : 'Submit'}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

const DataForm = (props) => {
    // return (
    //     <form id="domoForm"
    //         name="domoForm"
    //         onSubmit={(e) => handleDomo(e, props.triggerReload)}
    //         action="/maker"
    //         method="POST"
    //         className="domoForm">
    //             <label htmlFor="name">Name: </label>
    //             <input id="domoName" type="text" name="name" placeholder="Domo Name" />
    //             <label htmlFor="age">Age: </label>
    //             <input id="domoAge" type="number" min="0" name="age" />
    //             <p>Level: </p>
    //             <input id="domoLevel" type="number" min="0" name="level" />
    //             <input className="makeDomoSubmit" type="submit" value="Make Domo" />
    //     </form>
    // );

    const [parkNameDiary, setParkName] = useState('none');

    const handleDiary = (e, onDiaryAdded) => { 
        e.preventDefault();
        helper.hideError();
       
        if (document.getElementById('details-1').textContent === "Info") {
            helper.handleError('Please select a park before submitting a diary entry!');
            return false;
        }

        map.registerUpdateParkName(setParkName);
        currentPark = parkNameDiary;
      
        const date = e.target.querySelector('#visitedDate').value;
        const entry = e.target.querySelector('#tripDiary').value;
        const parkName = currentPark;
      
        if (!date || !entry) {
          helper.handleError('Both date and entry are required');
          return false;
        }

        if (!parkName) {
            helper.handleError('Error getting the park name');
            return false;
        }
      
        helper.sendPost(e.target.action, { date, entry, parkName }, onDiaryAdded);
        return false;
      };

    return (
        <div className="has-background-info p-1">
        <div className="has-background-info p-1">
            <h2 className="panel-heading m-1">Upload Your Trip Diary</h2>
            <div className="columns m-1">
                <div className="column has-background-info-light mr-1">
                    <form  id="dataForm"
                        name="dataForm"
                        onSubmit={(e) => handleDiary(e, props.triggerReload)}
                        action="/makeTripDiary"
                        method="POST">
                        <div>
                            <label htmlFor="visitedDate">Visited Date:</label>
                            <input
                                type="date"
                                id="visitedDate"
                                // value={visitedDate}
                                // onChange={handleVisitedDateChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="tripDiary">Trip Diary Entry:</label>
                            <textarea
                                id="tripDiary"
                                // value={tripDiary}
                                // onChange={handleDiaryChange}
                                placeholder="Write a diary entry"
                                required
                            />
                        </div>
                        <input type="submit" value="Make Diary" />
                    </form>

                    <div id='errorMessageDiv'>
                        <p id='errorMessage'></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
};



const App = () => {
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
            {/* <div id="digitalStampDiv">
                <DigitalStamp />
            </div> */}
            <div id="tripDiaryDiv">
                <TripDiary />
            </div>
		</div>
	</div>

        {/* <div id="photoGalleryDiv">
                <PhotoGallery />
        </div> */}

        <div id="dataFormDiv">
                <DataForm />
        </div>

        {/* <div>
            <ReloadWatcher />
        </div> */}
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
