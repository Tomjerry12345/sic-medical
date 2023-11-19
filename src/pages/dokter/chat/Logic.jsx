import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FirebaseServices from "../../../services/FirebaseServices";
import { log, timestamp } from "../../../values/Utilitas";

const Logic = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fs = FirebaseServices();

  const [input, setInput] = useState({
    message: "",
  });

  const [dislayName, setDisplayName] = useState("");
  const [u, setU] = useState();
  const [messages, setMessages] = useState();

  useEffect(() => {
    const unsubcribe = async () => {
      try {
        const user = await getUser();
        setU(user);

        setDisplayName(location.state.nama_lengkap);

        return await getMessages(user);
      } catch (e) {
        log({ e });
      }
    };
    return async () => await unsubcribe();
  }, []);

  const getUser = async () => await fs.getCurrentUser();

  const getMessages = async (user) => {
    try {
      let pasien;
      pasien = location.state.email;

      const dokter = user.email;

      return fs.getMessage(setMessages, dokter, pasien);
    } catch (error) {
      return null;
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
      const pasien = location.state.email;
      const dokter = user.email;

      const i = {
        ...input,
        sender: dokter,
        timestamp: timestamp(),
      };

      fs.sendMessage(dokter, pasien, i);
      setInput({
        message: "",
      });
    } catch (error) {
      alert(error);
    }
  };

  const onClickVideoCall = () => {
    log({ location });
    navigate("/dokter/konsultasi/calling", {
      state: {
        nama: location.state.nama,
        email: location.state.email,
        image: location.state.image,
        idCall: location.state.id_call,
        type: "calling",
      },
    });
  };

  const onClickResep = () => {
    navigate("/dokter/konsultasi/resep", {
      state: location.state,
    });
  };

  return {
    value: { input, messages, u, dislayName },
    func: { sendMessage, onChange, onClickVideoCall, onClickResep },
  };
};

export default Logic;
