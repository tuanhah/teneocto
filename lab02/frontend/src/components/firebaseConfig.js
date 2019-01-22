var config ={
    apiKey: "AIzaSyAkKi92iZwcIQ-TV_WW50AMgdmD3oLEjgs",
    authDomain: "teneocto-lab02.firebaseapp.com",
    databaseURL: "https://teneocto-lab02.firebaseio.com",
    projectId: "teneocto-lab02",
    storageBucket: "teneocto-lab02.appspot.com",
    messagingSenderId: "499354627749"
}

import firebase from 'firebase'
firebase.initializeApp(config);

const database = firebase.firestore();

database.settings({
	timestampsInSnapshots: true
});

export const db = database;

export const storage = firebase.storage();