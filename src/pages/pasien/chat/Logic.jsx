/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FirebaseServices from "services/FirebaseServices";
import { log } from "values/Utilitas";
import { timestamp } from "values/Utilitas";

const Logic = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fs = FirebaseServices();

  const [input, setInput] = useState({
    message: "",
  });

  const [u, setU] = useState();

  const [messages, setMessages] = useState();
  const [displayName, setDisplayName] = useState("");
  const [countDownRoom, setCountDownRoom] = useState("");

  useEffect(() => {
    return async () => {
      const user = await getUser();
      setU(user);
      setDisplayName(location.state.nama);
      getMessages(user);
    };
  }, []);

  useEffect(() => {
    countDownRoomChat();
  }, []);

  const countDownRoomChat = async () => {
    const user = await getUser();
    let jam_konsultasi = location.state.waktu_konsultasi_pasien;
    let konsultasi_parts = jam_konsultasi.split(":");
    let konsultasi_hours = parseInt(konsultasi_parts[0], 10);
    let konsultasi_minutes = parseInt(konsultasi_parts[1], 10);

    let nextConsultation = new Date();
    nextConsultation.setHours(konsultasi_hours);
    nextConsultation.setMinutes(konsultasi_minutes);
    nextConsultation.setSeconds(0);

    // Menambahkan 15 menit ke waktu konsultasi
    nextConsultation.setMinutes(nextConsultation.getMinutes() + 25);

    // Menghitung mundur
    let countdown = setInterval(async function () {
      let distance = nextConsultation.getTime() - new Date().getTime();

      // let hoursLeft = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);

      setCountDownRoom(
        `Sisa waktu: ${minutesLeft} menit, ${secondsLeft} detik`
      );

      if (distance < 0) {
        const dokter = location.state.email;
        const pasien = user.email;
        clearInterval(countdown);
        await fs.deleteMessage(dokter, pasien);
        navigate(-1);
      }
    }, 1000);
  };

  const getUser = async () => await fs.getCurrentUser();

  const getMessages = async (user) => {
    try {
      const dokter = location.state.email;
      const pasien = user.email;

      return fs.getMessage(setMessages, dokter, pasien);
    } catch (error) {
      // alert(error);
    }
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const sendMessage = async () => {
    try {
      const user = await getUser();
      const dokter = location.state.email;
      const pasien = user.email;

      const i = {
        ...input,
        sender: pasien,
        from: dokter,
        timestamp: timestamp(),
      };

      await fs.sendMessage(dokter, pasien, i);
      await fs.addData("pemberitahuan", {
        email_dokter: dokter,
        email_pasien: pasien,
        new: true,
        type: "konsultasi",
      });
      setInput({
        message: "",
      });
    } catch (error) {
      alert(error);
    }
  };

  const onClickVideoCall = () => {
    navigate("/dokter/konsultasi/calling", {
      state: {
        nama: location.state.nama,
        email: location.state.email,
        image: location.state.image,
        idCall: location.state.idCall,
        type: "calling",
      },
    });
  };

  const onClickResep = () => {
    log("location.state", location.state);
    navigate("/pasien/konsultasi/resep", {
      state: location.state,
    });
  };

  return {
    value: { input, messages, u, displayName, countDownRoom },
    func: { sendMessage, onChange, onClickVideoCall, onClickResep },
  };
};

export default Logic;
