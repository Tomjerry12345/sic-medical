import { useEffect, useState } from "react";
import FirebaseServices from "../../../../../services/FirebaseServices";
import { log } from "../../../../../values/Utilitas";
import { useLocation, useNavigate } from "react-router-dom";

const EditAppointmentLogic = () => {
  const [input, setInput] = useState({
    nama_dokter: "",
    spesialis: "",
    image: "",
    email: "",
    password: "",
    timestamp: new Date().getTime(),
  });
  const [loading, setLoading] = useState(false);
  const [img, setImage] = useState({
    currentFile: undefined,
    previewImage: undefined,
  });
  const [showPassword, setShowPassword] = useState(false);

  const fs = FirebaseServices();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const state = location.state;
    setImage({
      currentFile: null,
      previewImage: state.image,
    });
    setInput(state);
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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

  const onGetImage = (e) => {
    setImage({
      currentFile: e.target.files[0],
      previewImage: URL.createObjectURL(e.target.files[0]),
    });
  };

  const onEdit = async () => {
    try {
      setLoading(true);
      const id = input.id;
      delete input.id;
      delete input.email;
      delete input.no;
      delete input.id_call;
      log({ input });
      await fs.updateDocX("dokter", id, input);
      navigate("/admin/tambah-dokter");
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
      img,
      showPassword,
    },
    func: {
      onChange,
      onChangeDate,
      onEdit,
      onGetImage,
      handleClickShowPassword,
    },
  };
};

export default EditAppointmentLogic;
