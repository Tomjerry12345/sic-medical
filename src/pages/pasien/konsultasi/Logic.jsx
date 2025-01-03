/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseServices from "../../../services/FirebaseServices";
import {
  day,
  log,
  convertTimestampToDate,
  month,
  hour,
  minute,
} from "values/Utilitas";

const Logic = () => {
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [pickDokter, setPickDokter] = useState({
    waktu_konsultasi: null,
  });

  const [listWaktuKonsultasi, setListWaktuKonsultasi] = useState()

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
    const listDokter = [];
    const listKonsultasi = [];

    let resultDokter = await fs.getDataCollection("dokter");
    resultDokter = resultDokter.sort((a, b) =>
      a.nama_dokter > b.nama_dokter ? 1 : -1
    );

    const pasien = await fs.getCurrentUser();

    let resKonsultasi = await fs.getDataCollection("konsultasi");

    resultDokter.forEach((d) => {
      let l = {
        ...d,
      };
      resKonsultasi.forEach((k) => {
        const timestamp = convertTimestampToDate(k.timestamp);
        if (
          d.email === k.email_dokter && k.email_pasien === pasien.email &&
          timestamp.day === day() &&
          timestamp.month === month()
        ) {
          l = {
            ...l,
            ...k,
          };
        }


      });

      listDokter.push(l);
    });

    resKonsultasi.forEach((k) => {
      const timestamp = convertTimestampToDate(k.timestamp);

      if (timestamp.day === day() &&
        timestamp.month === month()) {
        const waktuKonsultasiPasien = k.waktu_konsultasi_pasien.split(":");
        const hourKonsultasi = waktuKonsultasiPasien[0]
        const minuteKonsultasi = waktuKonsultasiPasien[1]
        listKonsultasi.push({
          hour: hourKonsultasi,
          minute: minuteKonsultasi
        })
      }


    })

    setData(listDokter);
    setListWaktuKonsultasi(listKonsultasi)
  };

  const onPickTime = async (
    waktuKonsultasiDokter,
    emailDokter,
    namaDokter,
    image,
    idCall
  ) => {
    try {
      let isEmptyPasien = true;
      let resPasien = {};

      const startKonsultasiDokter = waktuKonsultasiDokter.mulai.split(":");
      const endKonsultasiDokter = waktuKonsultasiDokter.selesai.split(":");

      const pasien = await fs.getCurrentUser();
      let result = await fs.getDataQueryMultiple("konsultasi", [
        {
          key: "email_dokter",
          operator: "==",
          value: emailDokter,
        },
      ]);

      result.forEach((konsultasi) => {
        const timestamp = convertTimestampToDate(konsultasi.timestamp);
        if (
          konsultasi.email_pasien === pasien.email &&
          timestamp.day === day() &&
          timestamp.month === month()
        ) {
          isEmptyPasien = false;
          resPasien = {
            ...konsultasi,
          };
        }
      });

      if (isEmptyPasien) {
        const startHour = parseInt(startKonsultasiDokter[0]);
        const startMinute = parseInt(startKonsultasiDokter[1]);
        const endHour = parseInt(endKonsultasiDokter[0]);
        const endMinute = parseInt(endKonsultasiDokter[1]);

        const currentTimeInMinutes = hour() * 60 + minute();
        const endTimeInMinutes = endHour * 60 + endMinute;

        if (currentTimeInMinutes <= endTimeInMinutes) {
          setPickDokter({
            email_dokter: emailDokter,
            email_pasien: pasien.email,
            waktu_konsultasi: {
              startHour: startHour,
              startMinute: startMinute,
              endHour: endHour,
              endMinute: endMinute,
            },
          });
          setOpen(true);
        } else {
          alert("tidak bisa melakukan konsultasi, silahkan lakukan besok!");
        }
      } else {
        const konsultasiPasien = resPasien.waktu_konsultasi_pasien.split(":");
        const hourPasien = parseInt(konsultasiPasien[0]);
        const minutePasien = parseInt(konsultasiPasien[1]);
        if (
          hourPasien === hour() &&
          minute() >= minutePasien &&
          minute() <= minutePasien + 15
        ) {
          onMoveToChat(
            emailDokter,
            namaDokter,
            image,
            idCall,
            resPasien.waktu_konsultasi_pasien
          );
        } else {
          alert("anda sudah melakukan konsultasi pada hari ini!");
        }
      }
    } catch (e) {
      log({ e });
      alert(e);
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
      await fs.addData("pemberitahuan", {
        email_dokter: pickDokter.email_dokter,
        email_pasien: pickDokter.email_pasien,
        new: true,
        type: "konsultasi",
      });
      handleClose();
      window.location.replace(`${process.env.REACT_APP_BASE_URL}:3000/pasien/konsultasi`);
    } catch (e) {
      log({ e });
      alert(e);
    }
  };

  const onMoveToChat = (email, nama, image, idCall, waktuKonsultasiPasien) => {
    navigate("/pasien/konsultasi/chat", {
      state: {
        email,
        nama,
        image,
        idCall: idCall,
        waktu_konsultasi_pasien: waktuKonsultasiPasien,
      },
    });
  };

  return {
    value: {
      data,
      timePickerRef,
      open,
      pickDokter,
      listWaktuKonsultasi
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
