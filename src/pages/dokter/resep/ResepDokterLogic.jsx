import { useState } from "react";
import { useLocation } from "react-router-dom";
import { timestamp } from "values/Utilitas";

const ResepDokterLogic = () => {
  const location = useLocation();

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

  const sendRecipe = () => {
    const state = location.state;

    const i = {
      resep: input.resep,
      timestamp: timestamp(),
    };

    

    
  };
  return {
    value: {},
    func: {
      sendRecipe,
      onChange,
    },
  };
};

export default ResepDokterLogic;
