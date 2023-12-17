/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import FirebaseServices from "services/FirebaseServices";
import { log } from "values/Utilitas";
import { useLocation, useNavigate } from "react-router-dom";

const Logic = () => {
  const [input, setInput] = useState({
    id: "",
    nama_lengkap: "",
    email: "",
    no_hp: "",
    date: "",
    gender: "",
    type_diseases: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [dokter, setDokter] = useState([]);

  const fs = FirebaseServices();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const state = location.state;

    setInput(state);
    getDokter();
  }, []);

  const getDokter = async () => {
    const data = await fs.getDataCollection(
      "dokter",
      "nama_dokter",
      dokter.email
    );

    setDokter(data);
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onChangeDate = (e) => {
    log({ e });
    setInput({
      ...input,
      date: `${e["$y"]}-${e["$M"] + 1}-${e["$D"]}`,
    });
  };

  const onEdit = async () => {
    try {
      setLoading(true);
      const id = input.id;
      delete input.id;
      await fs.updateDocX("appointment", id, input);
      navigate("/pasien/appointment");
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
      dokter,
    },
    func: {
      onChange,
      onChangeDate,
      onEdit,
    },
  };
};

export default Logic;
