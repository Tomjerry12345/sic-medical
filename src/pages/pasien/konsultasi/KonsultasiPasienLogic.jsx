import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseServices from "../../../services/FirebaseServices";
import { day, log, convertTimestampToDate, month } from "values/Utilitas";

const KonsultasiPasienLogic = () => {
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [pickDokter, setPickDokter] = useState({
    waktu_konsultasi: null
  });

  const navigate = useNavigate();
  const fs = FirebaseServices();

  const timePickerRef = useRef(null);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     onGetData();
  //   }, 20000);

  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    onGetData();
  }, []);

  const onGetData = async () => {
    const listDokter = []

    let resultDokter = await fs.getDataCollection("dokter");
    resultDokter = resultDokter.sort((a, b) => (a.nama_dokter > b.nama_dokter ? 1 : -1));

    const pasien = await fs.getCurrentUser();

    let resKonsultasi = await fs.getDataQueryMultiple("konsultasi", [
      {
        key: "email_pasien",
        operator: "==",
        value: pasien.email,
      },
    ]);


    resultDokter.forEach(d => {
      let l = {
        ...d,
      }
      resKonsultasi.forEach(k => {
        const timestamp = convertTimestampToDate(k.timestamp);
        if (d.email === k.email_dokter && timestamp.day === day() && timestamp.month === month()) {
          l = {
            ...l,
            ...k
          }
        }
      })

      listDokter.push(l)
    })

    log({ listDokter })

    setData(resultDokter);
  };


  const onPickTime = async (waktuKonsultasiDokter, emailDokter, namaDokter) => {
    try {
      let isEmptyPasien = true

      const startKonsultasiDokter = waktuKonsultasiDokter.mulai.split(":")
      const endKonsultasiDokter = waktuKonsultasiDokter.selesai.split(":")

      const pasien = await fs.getCurrentUser();
      let result = await fs.getDataQueryMultiple("konsultasi", [
        {
          key: "email_dokter",
          operator: "==",
          value: emailDokter,
        },
      ]);

      result.forEach(e => {
        const timestamp = convertTimestampToDate(e.timestamp);
        if (e.email_pasien === pasien.email && timestamp.day === day() && timestamp.month === month()) {
          isEmptyPasien = false
        }
      })

      if (isEmptyPasien) {
        setPickDokter({
          email_dokter: emailDokter,
          email_pasien: pasien.email,
          waktu_konsultasi: {
            startHour: parseInt(startKonsultasiDokter[0]),
            startMinute: parseInt(startKonsultasiDokter[1]),
            endHour: parseInt(endKonsultasiDokter[0]),
            endMinute: parseInt(endKonsultasiDokter[1]),
          }
        });
        setOpen(true);
      } else {
        alert("anda sudah melakukan konsultasi pada hari ini!");
      }
    } catch (e) {
      alert(e)
    }

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
        waktu_konsultasi_pasien: time,
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
      pickDokter
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
