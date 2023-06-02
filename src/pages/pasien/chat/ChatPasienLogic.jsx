import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FirebaseServices from "../../../services/FirebaseServices";
import { timestamp } from "../../../values/Utilitas";

const ChatPasienLogic = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fs = FirebaseServices();

  const [input, setInput] = useState({
    message: "",
  });

  const [u, setU] = useState();

  const [messages, setMessages] = useState();
  const [displayName, setDisplayName] = useState("");

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
    value: { input, messages, u, displayName },
    func: { sendMessage, onChange },
  };
};

export default ChatPasienLogic;
