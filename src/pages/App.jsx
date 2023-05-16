import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseServices from "../services/FirebaseServices";

const App = () => {
  const navigate = useNavigate();
  const fs = FirebaseServices();

  useEffect(() => {
    const onLogged = async () => {
      try {
        const user = await fs.getCurrentUser();

        if (user !== null) {
          const result = await fs.getDataQuery("user", "email", user.email);
          const length = result.length;
          if (length === 0) {
            navigate("/dokter");
          } else {
            navigate("/pasien");
          }
        } else {
          navigate("/login");
        }
      } catch (e) {
        alert(e);
      }
    };

    onLogged();

    // if (getLogged) {
    //   log("main")
    // } else {
    //   log("login")
    // }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default App;
