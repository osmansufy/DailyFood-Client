import firebase from "firebase"
 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyBMANB3f9MKD1V5yMTkaN04wO2HE1W7vkc",
    authDomain: "hero-assignment-2e7cb.firebaseapp.com",
    databaseURL: "https://hero-assignment-2e7cb-default-rtdb.firebaseio.com",
    projectId: "hero-assignment-2e7cb",
    storageBucket: "hero-assignment-2e7cb.appspot.com",
    messagingSenderId: "286120152822",
    appId: "1:286120152822:web:8ca636db66eb974f3c66d7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase
