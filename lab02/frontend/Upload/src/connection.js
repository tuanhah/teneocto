
import Vue from 'vue';
import VueFire from 'vuefire';
import firebase from 'firebase/app';
import 'firebase/firestore';

var config = {
    apiKey: "AIzaSyAkKi92iZwcIQ-TV_WW50AMgdmD3oLEjgs",
    authDomain: "teneocto-lab02.firebaseapp.com",
    databaseURL: "https://teneocto-lab02.firebaseio.com",
    projectId: "teneocto-lab02",
    storageBucket: "teneocto-lab02.appspot.com",
    messagingSenderId: "499354627749"
  };
firebase.initializeApp(config);

