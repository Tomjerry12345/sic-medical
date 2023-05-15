// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAUPZ6Q0jrhZI8DrlSMN8AD890cahTjgg",
  authDomain: "sic-medical.firebaseapp.com",
  projectId: "sic-medical",
  storageBucket: "sic-medical.appspot.com",
  messagingSenderId: "116397823864",
  appId: "1:116397823864:web:0e2dcf4e1631c7a7cc5a8d",
  measurementId: "G-H6ZX2LETR8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, storage, db };
