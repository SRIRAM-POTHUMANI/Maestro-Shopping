import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAgntS2_JJHvzQ_8ZRbIkzvzPYsI-wEm6M",

  authDomain: "maestro-shopping.firebaseapp.com",

  projectId: "maestro-shopping",

  storageBucket: "maestro-shopping.appspot.com",

  messagingSenderId: "551267304586",

  appId: "1:551267304586:web:56adedbf3c871b662c5973",

  measurementId: "G-E3KEF5W22Z",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
