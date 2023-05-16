import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseServices from "../../../services/FirebaseServices";
import { log } from "../../../values/Utilitas";

const LoginLogic = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
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

  const onLogin = async () => {
    try {
      setLoading(true);
      await firebaseServices.loginWithEmail(input.email, input.password);
      const result = await firebaseServices.getDataQuery("user", "email", input.email);
      const length = result.length;
      if (length === 0) {
        navigate("/dokter");
      } else {
        navigate("/pasien");
      }
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

export default LoginLogic;
