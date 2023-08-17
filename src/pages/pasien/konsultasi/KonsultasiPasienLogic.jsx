import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseServices from "../../../services/FirebaseServices";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "config/FirebaseConfig";
import { log } from "values/Utilitas";

const KonsultasiPasienLogic = () => {
  const [data, setData] = useState();

  const navigate = useNavigate();
  const fs = FirebaseServices();

  // useEffect(() => {
  //   const colRef = collection(db, "dokter");
  //   //real time update

  //   onSnapshot(colRef, async (snapshot) => {
  //     let l = [];
  //     for (const doc of snapshot.docs) {
  //       const d = doc.data();
  //       l.push(d);
  //     }

  //     log({ l });

  //     l = l.sort((a, b) => (a.nama_dokter > b.nama_dokter ? 1 : -1));

  //     setData(l);
  //   });
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      onGetData();
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    onGetData();
  }, []);

  const onGetData = async () => {
    console.log("running...");
    let result = await fs.getDataCollection("dokter");
    result = result.sort((a, b) => (a.nama_dokter > b.nama_dokter ? 1 : -1));
    setData(result);
  };

  const onMoveToChat = (email, nama) => {
    navigate("/pasien/konsultasi/chat", {
      state: {
        email: email,
        nama: nama,
      },
    });
  };

  return {
    value: {
      data,
    },
    func: {
      onGetData,
      onMoveToChat,
    },
  };
};

export default KonsultasiPasienLogic;
