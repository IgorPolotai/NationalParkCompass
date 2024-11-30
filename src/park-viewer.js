// TODO: ADD YOUR imports and Firebase setup code HERE
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDl6db8rZpIsfKxsry-g4BWfbk0QoCP1ec",
    authDomain: "park-favorites-8a688.firebaseapp.com",
    projectId: "park-favorites-8a688",
    storageBucket: "park-favorites-8a688.appspot.com",
    messagingSenderId: "42367102459",
    appId: "1:42367102459:web:7d0e2d96acd5086dca6f5e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
import { getDatabase, ref, set, push, onValue, increment } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";
//console.log(app); // make sure firebase is loaded
//

let likedParks = document.querySelector("#liked-list");

const parks = {
    "p79"   : "Letchworth State Park",
    "p20"   : "Hamlin Beach State Park",
    "p180"  : "Brookhaven State Park",
    "p35"   : "Allan H. Treman State Marine Park",
    "p118"  : "Stony Brook State Park",
    "p142"  : "Watkins Glen State Park",
    "p62"   : "Taughannock Falls State Park",
    "p84"   : "Selkirk Shores State Park",
    "p43"   : "Chimney Bluffs State Park",
    "p200"  : "Shirley Chisholm State Park",
    "p112"  : "Saratoga Spa State Park"
  };

// Writes the id and increments or decrements the liked value to Firebase database
export const writeFavNameData = (id, value) => {
    const db = getDatabase();
    const favRef = ref(db, 'favorites/' + id);
    set(favRef, {
        id,
        likes: increment(value)
    });
};

//Clears the liked park list, then displays new list from data taken from Firebase database
const favoritesChanged = (snapshot) => {
    if (likedParks == null) return;
    likedParks.innerHTML = "";
    snapshot.forEach(park => {
        const childKey = park.key;
        const childData = park.val();
        //console.log(childKey, childData);
        let entry = document.createElement('li');
        entry.appendChild(document.createTextNode(`${parks[childData.id]} (${childData.id}) - Likes: ${childData.likes}`));
        likedParks.appendChild(entry);
    });
};

//Sets up the Firebase database
const init = () => {
    const db = getDatabase();
    const favoritesRef = ref(db, 'favorites/');
    onValue(favoritesRef, favoritesChanged);
};

init();