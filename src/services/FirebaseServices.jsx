import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { auth, storage, db } from "../config/FirebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const FirebaseServices = () => {
  const createUser = async (email, password) =>
    await createUserWithEmailAndPassword(auth, email, password);

  const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const addData = (col, data) => addDoc(collection(db, col), data);

  const getDataCollection = async (col) => {
    const collection_ref = collection(db, col);
    const docs = await getDocs(collection_ref);
    const data = [];
    docs.forEach((v) => {
      data.push({ ...v.data(), id: v.id });
    });

    return data;
  };

  const getDataQuery = async (col, key, value) => {
    const collection_ref = collection(db, col);
    const q = query(collection_ref, where(key, "==", value));
    const docs = await getDocs(q);
    const data = [];
    docs.forEach((v) => {
      data.push({ ...v.data(), id: v.id });
    });

    return data.sort((a, b) => a.timestamp - b.timestamp);
  };

  const updateDocAll = (col, document, data) => updateDoc(doc(db, col, document), data);

  const deletDoc = (col, document) => deleteDoc(doc(db, col, document));

  const loginWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const getCurrentUser = () =>
    new Promise((resolve, reject) => {
      auth.onAuthStateChanged(function (user) {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      });
    });

  return {
    createUser,
    uploadImage,
    addData,
    loginWithEmail,
    getDataQuery,
    getCurrentUser,
    updateDocAll,
    deletDoc,
    getDataCollection,
  };
};

export default FirebaseServices;
