import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// Firebase config object, used to authenticate to the Firebase servers
const firebaseConfig = {

    apiKey: "AIzaSyCSSx_wT7AbaplQmSbcxz923a-0Q6UZ1dA",
  
    authDomain: "workshop-61e8e.firebaseapp.com",
  
    projectId: "workshop-61e8e",
  
    storageBucket: "workshop-61e8e.appspot.com",
  
    messagingSenderId: "55259303361",
  
    appId: "1:55259303361:web:38377a939360a5baabb340"
  
};
  


// initialize Firebase with the config above
const app = initializeApp(firebaseConfig);


// initialize firestore database
const db = getFirestore(app);



// initialize firebase authentication
const auth = getAuth(app);



// export the database and the authentication objects

export { db, auth }
