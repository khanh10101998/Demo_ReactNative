import * as firebase from 'firebase'

var Firebase = require('firebase');
var config = {
    apiKey: "AIzaSyCeRnU1HUYrga1z2swJebHktj8J4Qnb0As",
    authDomain: "reactnative-f688f.firebaseapp.com",
    databaseURL: "https://reactnative-f688f.firebaseio.com",
    projectId: "reactnative-f688f",
    storageBucket: "reactnative-f688f.appspot.com",
    messagingSenderId: "342637418958"
  };
  export default  Firebase = firebase.initializeApp(config,"assignmentReactnative");