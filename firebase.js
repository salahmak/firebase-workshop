import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Firebase config object, used to authenticate to the Firebase servers
const firebaseConfig = {
    apiKey: "AIzaSyC2h-iCj8QmAuvFIlzKZLl168Rchay1rRQ",

    authDomain: "testing-27f8f.firebaseapp.com",

    projectId: "testing-27f8f",

    storageBucket: "testing-27f8f.appspot.com",

    messagingSenderId: "759093069131",

    appId: "1:759093069131:web:530b713c512bb38eced4ce",

    measurementId: "G-EKVM8LJGC5",
};

// initialize Firebase with the config above
const app = initializeApp(firebaseConfig);

// initialize firestore database service
const db = getFirestore();

// initialize authentication service
const auth = getAuth();

export { auth, db };
