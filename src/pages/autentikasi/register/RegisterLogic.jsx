import { useState } from "react";
import { log } from "../../../values/Utilitas";
import FirebaseServices from "../../../services/FirebaseServices";
import { useNavigate } from "react-router-dom";

const RegisterLogic = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    nama_lengkap: "",
    gender: "",
    type: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [image, setImage] = useState({
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
      const urlImage = await firebaseServices.uploadImage(image.currentFile);
      const data = {
        email: input.email,
        nama_lengkap: input.nama_lengkap,
        gender: input.nama_lengkap,
        image: urlImage,
        type: "pasien",
      };
      await firebaseServices.addData("user", data);
      log("success");
      navigate("/login");
    } catch (e) {
      setLoading(false);
      log("error", e);
      alert(e);
    }
  };

  const onMoveToLogin = () => {
    navigate("/login");
  };

  return {
    value: {
      showPassword,
      image,
      loading,
    },
    func: {
      onChange,
      onRegister,
      handleClickShowPassword,
      onGetImage,
      onMoveToLogin,
    },
  };
};

export default RegisterLogic;
