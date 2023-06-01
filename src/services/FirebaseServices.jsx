import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
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
  setDoc,
  serverTimestamp,
  orderBy,
  limit,
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { log, timestamp } from "../values/Utilitas";

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

  const addData = (col, data) =>
    addDoc(collection(db, col), { ...data, timestamp: serverTimestamp() });

  const sendMessage = (dokter, pasien, data) => {
    const colRef = collection(db, `chat`, dokter, "message", pasien, "message");
    const colUser = doc(db, `chat`, dokter, "message", pasien);
    addDoc(colRef, data);
    setDoc(colUser, { generate: timestamp() });
  };

  const getMessage = (setMessages, dokter, pasien) => {
    const colRef = collection(db, `chat`, dokter, "message", pasien, "message");
    const q = query(colRef, orderBy("timestamp"), limit(50));

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        const data = doc.data();
        log({ data });
        messages.push({ ...doc.data(), id: doc.id });
      });
      // messages = messages.sort((a, b) => a.timestamp - b.timestamp);
      setMessages(messages);
    });

    return unsubscribe;
  };

  const getGrupMessage = async (dokter) => {
    try {
      // const docRef = doc(db, "chat", dokter);
      const colRef = collection(db, `chat`, dokter, "message");

      const docs = await getDocs(colRef);

      const userGroup = [];
      docs.forEach(async (v) => {
        const id = v.id;
        userGroup.push(id);
      });

      return userGroup;
    } catch (error) {
      alert(error);
    }
  };

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

    // return data.sort((a, b) => a.timestamp - b.timestamp);
    return data;
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

  const onSignOut = async () => await signOut(auth);

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
    sendMessage,
    getMessage,
    getGrupMessage,
    onSignOut,
  };
};

export default FirebaseServices;
