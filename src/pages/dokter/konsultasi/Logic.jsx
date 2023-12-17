import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { convertTimestampToDate, day, hour, log, minute, month } from "values/Utilitas";
import FirebaseServices from "../../../services/FirebaseServices";

const Logic = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const fs = FirebaseServices();

  useEffect(() => {
    onGetData();
  }, []);

  const getUser = async () => await fs.getCurrentUser();

  const onGetData = async () => {
    try {
      // const user = await getUser();
      // const userGroup = await fs.getGrupMessage(user.email);

      // const promises = [];
      // userGroup.map((email) => promises.push(getU(email)));

      // const result = await Promise.all(promises);
      // setData(result);

      const listDataKonsultasi = [];

      const dokter = await fs.getCurrentUser();

      let resKonsultasi = await fs.getDataQueryMultiple("konsultasi", [
        {
          key: "email_dokter",
          operator: "==",
          value: dokter.email,
        },
      ]);

      let resUser = await fs.getDataCollection("user");

      log({ resUser })

      resKonsultasi = resKonsultasi.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));

      resKonsultasi.forEach(konsultasi => {
        const timestamp = convertTimestampToDate(konsultasi.timestamp);
        if (timestamp.day === day() && timestamp.month === month()) {
          resUser.forEach(user => {
            if (konsultasi.email_pasien === user.email) {
              listDataKonsultasi.push({ ...konsultasi, id_call: user.id_call, image_pasien: user.image, nama_pasien: user.nama_lengkap })
              return
            }
          })

        }
      })
      log({ listDataKonsultasi })
      setData(listDataKonsultasi);
    } catch (error) {
      alert(error);
    }
  };

  const getU = async (email) => {
    try {
      const result = await fs.getDataQuery("user", "email", email);
      return result[0];
    } catch (err) {
      throw err;
    }
  };

  const onClickCard = (item) => {
    const konsultasiPasien = item.waktu_konsultasi_pasien.split(":")
    const hourPasien = parseInt(konsultasiPasien[0])
    const minutePasien = parseInt(konsultasiPasien[1])
    if (hourPasien === hour() && (minute() >= minutePasien && minute() <= minutePasien + 15)) {
      onMoveToChat(item)
    } else {
      alert("belum bisa melakukan konsultasi!");
    }
  }

  const onMoveToChat = (item) => {

    navigate("/dokter/konsultasi/chat", {
      state: {
        waktu_konsultasi_pasien: item.waktu_konsultasi_pasien,
        nama_lengkap: item.nama_pasien,
        email: item.email_pasien,
        image: item.image_pasien,
        idCall: ""
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
      onClickCard
    },
  };
};

export default Logic;
