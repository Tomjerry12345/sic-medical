import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { log } from "../../../values/Utilitas";

const CallingDokterLogic = () => {
  const [state, setState] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    log("location.state", location.state);
    setState(location.state);
  }, []);
  return {
    value: { state },
    func: {},
  };
};

export default CallingDokterLogic;
