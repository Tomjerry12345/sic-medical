import { useEffect, useState } from "react";
import FirebaseServices from "services/FirebaseServices";
import { useLocation, useNavigate } from "react-router-dom";
import { log } from "values/Utilitas";
import { collection } from "@firebase/firestore";
import { db } from "config/FirebaseConfig";

const Logic = () => {
  const [input, setInput] = useState({
    date: "",
    keluhan: "",
    tindakan: "",
    timestamp: new Date().getTime(),
  });

  const [loading, setLoading] = useState(false);

  const fs = FirebaseServices();
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state.item;

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onChangeDate = (e) => {
    setInput({
      ...input,
      date: `${e["$y"]}-${e["$M"] + 1}-${e["$D"]}`,
    });
  };

  const onMake = async () => {
    try {
      setLoading(true);
      log({ input });
      const email = item.email;
      log({ email });
      await fs.addDataSpecifict(
        collection(db, "rekam-medis", email, "diagnosa"),
        input
      );
      navigate(-1);
    } catch (error) {
      setLoading(false);
      log({ error });
      alert(error);
    }
  };

  return {
    value: {
      input,
      loading,
    },
    func: {
      onChange,
      onChangeDate,
      onMake,
    },
  };
};

export default Logic;
