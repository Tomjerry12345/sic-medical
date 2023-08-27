import { useState } from "react";
import { log } from "../../../values/Utilitas";
import FirebaseServices from "../../../services/FirebaseServices";
import { useNavigate } from "react-router-dom";

const Logic = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    nama_lengkap: "",
    gender: "",
    type: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [img, setImage] = useState({
    currentFile: undefined,
    previewImage: undefined,
  });
  const [loading, setLoading] = useState(false);

  const firebaseServices = FirebaseServices();
  const navigate = useNavigate();

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
    setInput({
      ...input,
      tanggal_lahir: `${e["$y"]}-${e["$M"] + 1}-${e["$D"]}`,
    });
  };

  const onGetImage = (e) => {
    setImage({
      currentFile: e.target.files[0],
      previewImage: URL.createObjectURL(e.target.files[0]),
    });
  };

  const onRegister = async () => {
    try {
      setLoading(true);
      await firebaseServices.createUser(input.email, input.password);
      const image = await firebaseServices.uploadImage(img.currentFile);
      const data = {
        ...input,
        image,
        type: "pasien",
      };
      await firebaseServices.addData("user", data);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      log({ error });
      alert(error);
    }
  };

  const onMoveToLogin = () => {
    navigate("/login");
  };

  return {
    value: {
      showPassword,
      img,
      loading,
    },
    func: {
      onChange,
      onChangeDate,
      onRegister,
      handleClickShowPassword,
      onGetImage,
      onMoveToLogin,
    },
  };
};

export default Logic;
