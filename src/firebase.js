// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJsLW8tTzjDYWTmhG4D4wemhQz3kWBQ4w",
  authDomain: "animalrecognitionapp-406d5.firebaseapp.com",
  projectId: "animalrecognitionapp-406d5",
  storageBucket: "animalrecognitionapp-406d5.appspot.com",
  messagingSenderId: "965354853849",
  appId: "1:965354853849:web:dbba94ac66edc8297835c8",
  databaseURL: "https://animalrecognitionapp-406d5-default-rtdb.firebaseio.com"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };