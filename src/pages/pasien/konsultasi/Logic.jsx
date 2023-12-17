import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseServices from "../../../services/FirebaseServices";
import { day, log, convertTimestampToDate, month, hour, minute, getLocal } from "values/Utilitas";

const Logic = () => {
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

    setData(listDokter);
  };


  const onPickTime = async (waktuKonsultasiDokter, emailDokter, namaDokter, image, idCall) => {
    try {
      let isEmptyPasien = true
      let resPasien = {}

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

      result.forEach(konsultasi => {
        const timestamp = convertTimestampToDate(konsultasi.timestamp);
        if (konsultasi.email_pasien === pasien.email && timestamp.day === day() && timestamp.month === month()) {
          isEmptyPasien = false
          resPasien = {
            ...konsultasi

          }
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
        const konsultasiPasien = resPasien.waktu_konsultasi_pasien.split(":")
        const hourPasien = parseInt(konsultasiPasien[0])
        const minutePasien = parseInt(konsultasiPasien[1])
        if (hourPasien === hour() && (minute() >= minutePasien && minute() <= minutePasien + 15)) {
          log({ konsultasiPasien })
          onMoveToChat(emailDokter, namaDokter, image, idCall, resPasien.waktu_konsultasi_pasien)
        } else {
          alert("anda sudah melakukan konsultasi pada hari ini!");
        }

      }
    } catch (e) {
      log({ e })
      alert(e)
    }

  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChangeTime = async (e) => {
    try {
      const time = `${e.hour()}:${e.minute()}`;
      // const namaPasien = getLocal("nama")
      // const imagePasien = getLocal("image")

      await fs.addData("konsultasi", {
        email_dokter: pickDokter.email_dokter,
        email_pasien: pickDokter.email_pasien,
        // nama_pasien: namaPasien,
        // image_pasien: imagePasien,
        waktu_konsultasi_pasien: time,
      });
      handleClose()
    } catch (e) {
      log({ e })
      alert(e)
    }

  };

  const onMoveToChat = (email, nama, image, idCall, waktuKonsultasiPasien) => {
    navigate("/pasien/konsultasi/chat", {
      state: {
        email,
        nama,
        image,
        idCall: idCall,
        waktu_konsultasi_pasien: waktuKonsultasiPasien
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

export default Logic;
