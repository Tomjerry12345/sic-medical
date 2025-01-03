/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import FirebaseServices from "services/FirebaseServices";
import { useNavigate } from "react-router-dom";
import { getLocal, log } from "values/Utilitas";

const Logic = () => {
  const [input, setInput] = useState({
    nama_lengkap: "",
    email: "",
    no_hp: "",
    date: "",
    gender: "",
    message: "",
    timestamp: new Date().getTime(),
    nama_dokter: "",
    email_dokter: "",
  });

  const [loading, setLoading] = useState(false);
  const [dokter, setDokter] = useState([]);

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
    getDokter();
  }, []);

  const getDokter = async () => {
    const data = await fs.getDataCollection("dokter", "nama_dokter", dokter.email);

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

  const onChangeDokter = (e) => {
    const value = e.target.value;
    const array = value.split("-");

    setInput({
      ...input,
      new: true,
      email_dokter: array[0],
      nama_dokter: array[1],
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
      const email = getLocal("email");
      await fs.addData("appointment", input);
      await fs.addData("pemberitahuan", {
        email_dokter: input.email_dokter,
        email_pasien: email,
        new: true,
        type: "appointment",
      });
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
      onMake,
      onChangeDokter,
    },
  };
};

export default Logic;
