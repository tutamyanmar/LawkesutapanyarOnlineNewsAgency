// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZzf0LaslkiMtavQj1gpsoZVWfgBYEOTk",
  authDomain: "lawkesutapanyar.firebaseapp.com",
  projectId: "lawkesutapanyar",
  storageBucket: "lawkesutapanyar.firebasestorage.app",
  messagingSenderId: "963920186949",
  appId: "1:963920186949:web:a00dabec814b3cda3e1d2c",
  measurementId: "G-L6B43MJY6S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
