// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from "firebase/firestore"
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt_v9QOHx4zZsX1t--jCBBLRYFs3O73xs",
  authDomain: "cub-messenger.firebaseapp.com",
  projectId: "cub-messenger",
  storageBucket: "cub-messenger.appspot.com",
  messagingSenderId: "220208979880",
  appId: "1:220208979880:web:c370fcc11b7b2e9452079d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)