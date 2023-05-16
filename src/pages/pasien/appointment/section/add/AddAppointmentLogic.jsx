import { useEffect, useState } from "react";
import FirebaseServices from "../../../../../services/FirebaseServices";
import { useNavigate } from "react-router-dom";
import { log } from "../../../../../values/Utilitas";

const AddAppointmentLogic = () => {
  const [input, setInput] = useState({
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

  useEffect(() => {
    const getData = async () => {
      const user = await fs.getCurrentUser();
      const data = await fs.getDataQuery("user", "email", user.email);

      setInput({
        ...input,
        nama_lengkap: data[0]["nama_lengkap"],
        email: data[0]["email"],
        gender: data[0]["gender"],
      });
    };

    getData();
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
    setInput({
      ...input,
      date: `${e["$y"]}-${e["$M"] + 1}-${e["$D"]}`,
    });
  };

  const onMake = async () => {
    try {
      setLoading(true);
      await fs.addData("appointment", input);
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
      onMake,
    },
  };
};

export default AddAppointmentLogic;
