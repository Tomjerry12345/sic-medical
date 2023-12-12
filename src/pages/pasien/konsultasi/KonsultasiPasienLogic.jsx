import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseServices from "../../../services/FirebaseServices";
import { day, timestamp } from "values/Utilitas";

const KonsultasiPasienLogic = () => {
  const [data, setData] = useState();
  const [listKonsultasi, setListKonsultasi] = useState();
  const [open, setOpen] = useState(false);
  const [pickDokter, setPickDokter] = useState();

  const navigate = useNavigate();
  const fs = FirebaseServices();

  const timePickerRef = useRef(null);

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

  //   const onGetData = async () => {
  //     console.log("running...");
  //     let result = await fs.getDataCollection("dokter");

  //     // Mengubah huruf pertama menjadi huruf besar di setiap nama dokter
  //     result = result.map((dokter) => {
  //         dokter.nama_dokter = dokter.nama_dokter.charAt(0).toUpperCase() + dokter.nama_dokter.slice(1);
  //         return dokter;
  //     });

  //     // Melakukan pengurutan
  //     result = result.sort((a, b) => (a.nama_dokter > b.nama_dokter ? 1 : -1));

  //     setData(result);
  // };

  const onPickTime = async (waktuKonsultasi, email, nama) => {
    const list = []

    const pasien = await fs.getCurrentUser();
    let result = await fs.getDataQueryMultiple("konsultasi", [
      {
        key: "email_dokter",
        value: email,
      },
      {
        key: "date",
        value: timestamp(),
      },
    ]);

    if (result.length < 1) {
      setOpen(true);
    } else {
      alert("anda sudah melakukan konsultasi pada hari ini!");
    }

    result.forEach(e => {
      const waktuKonsultasi = e.waktu_konsultasi.split(":")


      list.push({
        startHour: waktuKonsultasi[0],
        startMinute: waktuKonsultasi[1]
      })
    })

    setPickDokter({
      email_dokter: email,
      email_pasien: pasien.email,
    });

    setListKonsultasi(list);


  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeTime = async (e) => {
    try {
      const time = `${e.hour()}:${e.minute()}`;

      await fs.addData("konsultasi", {
        email_dokter: pickDokter.email_dokter,
        email_pasien: pickDokter.email_pasien,
        waktu_konsultasi: time,
      });
      handleClose()
    } catch (e) {
      alert(e)
    }

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
      timePickerRef,
      open,
      listKonsultasi,
    },
    func: {
      onGetData,
      onPickTime,
      onMoveToChat,
      handleClose,
      onChangeTime,
    },
  };
};

export default KonsultasiPasienLogic;
