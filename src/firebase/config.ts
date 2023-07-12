// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCAx2M9mr6NjaD_-40iROJkr2lJfd8kZY",
  authDomain: "photo-gallery-6e168.firebaseapp.com",
  projectId: "photo-gallery-6e168",
  storageBucket: "photo-gallery-6e168.appspot.com",
  messagingSenderId: "425970496710",
  appId: "1:425970496710:web:07ebb7a319e52d1a1d53c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app)
export {auth,storage, db};