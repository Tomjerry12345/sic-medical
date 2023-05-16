import { useEffect, useState } from "react";
import FirebaseServices from "../../../../../services/FirebaseServices";
import { log } from "../../../../../values/Utilitas";
import { useLocation, useNavigate } from "react-router-dom";

const EditAppointmentLogic = () => {
  const [input, setInput] = useState({
    id: "",
    nama_lengkap: "",
    email: "",
    no_hp: "",
    date: "",
    gender: "",
    type_diseases: "",
    message: "",
    timestamp: new Date().getTime(),
  });

  const [loading, setLoading] = useState(false);

  const fs = FirebaseServices();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // const getData = async () => {
    //   const user = await fs.getCurrentUser();
    //   const data = await fs.getDataQuery("user", "email", user.email);

    //   setInput({
    //     ...input,
    //     nama_lengkap: data[0]["nama_lengkap"],
    //     email: data[0]["email"],
    //     gender: data[0]["gender"],
    //   });
    // };

    // getData();

    const state = location.state;

    log({ state });
    setInput(state);
  }, []);

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
      await fs.updateDocAll("appointment", id, input);
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
    },
    func: {
      onChange,
      onChangeDate,
      onEdit,
    },
  };
};

export default EditAppointmentLogic;
