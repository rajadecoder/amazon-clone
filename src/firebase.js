import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCmRU4deQx-VVwk7XZumFsolpBugbcJmCI",
    authDomain: "clone-54d6d.firebaseapp.com",
    projectId: "clone-54d6d",
    storageBucket: "clone-54d6d.appspot.com",
    messagingSenderId: "521199772723",
    appId: "1:521199772723:web:dc00cd7f0ad59cffde2f46",
    measurementId: "G-GDBS2TFLWC"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db= firebaseApp.firestore();
  const auth = firebase.auth();

export {db,auth};