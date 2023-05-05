import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAsync } from "../redux/main/main.thunks";
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
