import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser,
} from "firebase/auth";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { auth, storage, db } from "config/FirebaseConfig";
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
} from "firebase/firestore";
import { day, month, timestamp, year } from "../values/Utilitas";
import { log } from "values/Utilitas";

const FirebaseServices = () => {
  const createUser = async (email, password) =>
    await createUserWithEmailAndPassword(auth, email, password);

  const deleteUserServices = (col, email, password, id) =>
    new Promise(async (resolve, reject) => {
      await loginWithEmail(email, password);
      auth.onAuthStateChanged(function (user) {
        if (user !== null) {
          deleteUser(user)
            .then(() => {
              // User deleted.
              deletDoc(col, id);
              resolve(true);
            })
            .catch((error) => {
              log({ error });
              resolve(false);
            });
        }
      });
    });

  const uploadImage = (file) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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

  const addDataSpecifict = (col, data) =>
    addDoc(col, { ...data, timestamp: serverTimestamp() });

  const addDataSpecifictDocument = (col, document, data) =>
    setDoc(doc(db, col, document), data);

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
        messages.push({ ...doc.data(), id: doc.id });
      });
      messages = messages.sort((a, b) => a.timestamp - b.timestamp);
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

  const deleteMessage = async (dokter, pasien) => {
    const colRef = collection(db, `chat/${dokter}/message/${pasien}/message`);

    getDocs(colRef)
      .then((querySnapshot) => {
        const deletePromises = [];

        querySnapshot.forEach((doc) => {
          deletePromises.push(deleteDoc(doc.ref));
        });

        return Promise.all(deletePromises);
      })
      .then(() => {
        return getDocs(colRef);
      })
      .then((emptySnapshot) => {
        if (emptySnapshot.size === 0) {
          const parentCollection = colRef.parent;
          return deleteDoc(parentCollection, "message"); // Delete 'message' field to remove the collection
        }
        return Promise.resolve();
      })
      .then(() => {
        console.log("Operasi penghapusan selesai.");
      })
      .catch((error) => {
        console.error("Terjadi kesalahan:", error);
      });
  };

  const resetMessage = async () => {
    const resKonsultasi = await getDataCollection("konsultasi");
    if (resKonsultasi.length > 0) {
      resKonsultasi.forEach(async (e) => {
        const emailDokter = e["email_dokter"];
        const emailPasien = e["email_pasien"];
        const currentTimestamp = e["timestamp"].toMillis();
        const nowTimestamp = timestamp();
        const oneDay = 24 * 60 * 60 * 1000

        if ((nowTimestamp - currentTimestamp) >  oneDay) {
          await deleteMessage(emailDokter, emailPasien);
          await deletDoc("konsultasi", e.id);
        }
      });
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

  // const getNotif = async (col, setData) => {
  //   const user = await getCurrentUser();
  //   const collection_ref = collection(db, col);

  //   const q = query(
  //     collection_ref,
  //     where("email", "==", user.email),
  //     where("new", "==", true)
  //   );

  //   const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //     const newData = [];
  //     querySnapshot.forEach((doc) => {
  //       newData.push({ id: doc.id, ...doc.data() });
  //     });
  //     console.log(newData);
  //     // Lakukan sesuatu dengan data newData
  //   });
  // };

  const getDataSpecifict = async (col) => {
    const collection_ref = col;
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

  const getDataQuery2 = async (col, key, value, key1, value1) => {
    const collection_ref = collection(db, col);
    const q = query(
      collection_ref,
      where(key, "==", value),
      where(key1, "==", value1)
    );
    const docs = await getDocs(q);
    const data = [];
    docs.forEach((v) => {
      data.push({ ...v.data(), id: v.id });
    });

    // return data.sort((a, b) => a.timestamp - b.timestamp);
    return data;
  };

  const getDataQueryMultiple = async (col, keyValue) => {
    const collection_ref = collection(db, col);
    const q = query(
      collection_ref,
      ...keyValue.map(({ key, operator, value }) => where(key, operator, value))
    );
    const docs = await getDocs(q);
    return docs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  };

  const updateDocX = (col, document, data) =>
    updateDoc(doc(db, col, document), data);

  const deletDoc = (col, document) => deleteDoc(doc(db, col, document));

  const loginWithEmail = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

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
    deleteUserServices,
    uploadImage,
    addData,
    addDataSpecifict,
    loginWithEmail,
    getDataQuery,
    getDataQuery2,
    getDataQueryMultiple,
    getCurrentUser,
    updateDocX,
    deletDoc,
    getDataCollection,
    // getNotif,
    getDataSpecifict,
    sendMessage,
    getMessage,
    getGrupMessage,
    deleteMessage,
    resetMessage,
    onSignOut,
  };
};

export default FirebaseServices;
