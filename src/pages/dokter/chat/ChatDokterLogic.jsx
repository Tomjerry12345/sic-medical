import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FirebaseServices from "../../../services/FirebaseServices";
import { log, timestamp } from "../../../values/Utilitas";

const ChatDokterLogic = () => {
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
    return async () => {
      const user = await getUser();
      setU(user);
      setDisplayName(location.state.nama);
      getMessages(user);
    };
  }, []);

  const getUser = async () => await fs.getCurrentUser();

  const getMessages = async (user) => {
    try {
      const pasien = location.state.email;
      const dokter = user.email;

      log({ pasien });
      log({ dokter });

      return fs.getMessage(setMessages, dokter, pasien);
    } catch (error) {
      alert(error);
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

      await fs.sendMessage(dokter, pasien, i);
      setInput({
        message: "",
      });
    } catch (error) {
      alert(error);
    }
  };

  return {
    value: { input, messages, u, dislayName },
    func: { sendMessage, onChange },
  };
};

export default ChatDokterLogic;
