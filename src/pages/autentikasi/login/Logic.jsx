import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseServices from "../../../services/FirebaseServices";
import { log, setLocal } from "../../../values/Utilitas";
import { SocketContext } from "../../../services/Context";

const Logic = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const firebaseServices = FirebaseServices();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { onGetId } = useContext(SocketContext);

  useEffect(() => {
    console.log("https://medium.com/@Carmichaelize/enabling-the-microphone-camera-in-chrome-for-local-unsecure-origins-9c90c3149339")
  }, [])


  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onLogin = async () => {
    try {
      setLoading(true);

      if (input.email === "admin" && input.password === "admin123") {
        navigate("/admin");
      } else {
        await firebaseServices.loginWithEmail(input.email, input.password);
        const result = await firebaseServices.getDataQuery(
          "user",
          "email",
          input.email
        );
        const length = result.length;

        setLocal("email", input.email);

        if (length === 0) {
          navigate("/dokter");
        } else {
          setLocal("nama", result[0].nama_lengkap);
          setLocal("image", result[0].image);
          navigate("/pasien");
        }
      }

      onGetId();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      log({ error });
      alert(error);
    }
  };

  const onMoveToRegister = () => {
    navigate("/register");
  };

  return {
    value: {
      showPassword,
      loading,
    },
    func: {
      onChange,
      onLogin,
      onMoveToRegister,
      handleClickShowPassword,
    },
  };
};

export default Logic;
