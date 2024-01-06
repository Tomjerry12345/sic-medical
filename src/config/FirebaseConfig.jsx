// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Nurhikmah H
// const firebaseConfig = {
//   apiKey: "AIzaSyBas2FP-nT0UqlHS7CSQkB-APGeuHQ0ouo",
//   authDomain: "sic-medical-11a53.firebaseapp.com",
//   projectId: "sic-medical-11a53",
//   storageBucket: "sic-medical-11a53.appspot.com",
//   messagingSenderId: "225389562879",
//   appId: "1:225389562879:web:49b24fa113e581198135ca",
//   measurementId: "G-W4JYM4WQ36",
// };

// Andrialfiandi46

const firebaseConfig = {
  apiKey: "AIzaSyCAUPZ6Q0jrhZI8DrlSMN8AD890cahTjgg",
  authDomain: "sic-medical.firebaseapp.com",
  projectId: "sic-medical",
  storageBucket: "sic-medical.appspot.com",
  messagingSenderId: "116397823864",
  appId: "1:116397823864:web:0e2dcf4e1631c7a7cc5a8d",
  measurementId: "G-H6ZX2LETR8",
};

// Andrialfiandi055

// const firebaseConfig = {
//   apiKey: "AIzaSyBGclGKY2awIgGwtKYBtaCMC9E5WdK3w1E",
//   authDomain: "sic-medical-c46d6.firebaseapp.com",
//   projectId: "sic-medical-c46d6",
//   storageBucket: "sic-medical-c46d6.appspot.com",
//   messagingSenderId: "1084281628215",
//   appId: "1:1084281628215:web:588991702441929ecec1b2",
//   measurementId: "G-ZCDZ5LXWN0",
// };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, storage, db };
