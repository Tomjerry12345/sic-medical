import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getLocal, log,
} from "../values/Utilitas";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getLogged = getLocal("logged")

    if (getLogged) {
      log("main")
    } else {
      log("login")
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default App;
