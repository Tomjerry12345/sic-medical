import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FirebaseServices from "services/FirebaseServices";
import { timestamp } from "values/Utilitas";

const Logic = () => {
  const location = useLocation();
  const fs = FirebaseServices();

  const navigate = useNavigate();

  const [input, setInput] = useState({
    resep: "",
  });

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const sendRecipe = async () => {
    try {
      const user = await fs.getCurrentUser();
      const state = location.state;

      const i = {
        ...input,
        pasienEmail: state.email,
        dokterEmail: user.email,
        timestamp: timestamp(),
      };

      await fs.addData("resep", i);

      navigate("/");
    } catch (e) {
      alert(e);
    }
  };

  return {
    value: {
      input,
    },
    func: {
      sendRecipe,
      onChange,
    },
  };
};

export default Logic;
