// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDECTKnoqT38xOhCcSLJElkn7lskJM-vws",
  authDomain: "shop-app-68f37.firebaseapp.com",
  projectId: "shop-app-68f37",
  storageBucket: "shop-app-68f37.appspot.com",
  messagingSenderId: "46047397770",
  appId: "1:46047397770:web:91a946d94e407f4b65aa73",
  measurementId: "G-2VLCM7D4DN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth= getAuth(app)
 export const firestore = getFirestore(app);
export const storage = getStorage(app)

// const analytics = getAnalytics(app);