// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBas2FP-nT0UqlHS7CSQkB-APGeuHQ0ouo",
  authDomain: "sic-medical-11a53.firebaseapp.com",
  projectId: "sic-medical-11a53",
  storageBucket: "sic-medical-11a53.appspot.com",
  messagingSenderId: "225389562879",
  appId: "1:225389562879:web:49b24fa113e581198135ca",
  measurementId: "G-W4JYM4WQ36",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, storage, db };
