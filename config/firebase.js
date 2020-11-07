import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'


  var firebaseConfig = {
    apiKey: "AIzaSyCrEKa4eY8LN6AJwCEGxzmRjHkHsEFbctc",
    authDomain: "fir-database-6f7fc.firebaseapp.com",
    databaseURL: "https://fir-database-6f7fc.firebaseio.com",
    projectId: "fir-database-6f7fc",
    storageBucket: "fir-database-6f7fc.appspot.com",
    messagingSenderId: "489357761157",
    appId: "1:489357761157:web:60915e1266b93f445d27ec",
    measurementId: "G-633F4BE9W7"
  };

  firebase.initializeApp(firebaseConfig)

  export default  firebase;
