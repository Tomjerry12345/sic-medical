import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLocal, log } from "../values/Utilitas";
import FirebaseServices from "../services/FirebaseServices";

const App = () => {
  const navigate = useNavigate();
  const fs = FirebaseServices();

  useEffect(() => {
    const onLogged = async () => {
      try {
        const user = await fs.getCurrentUser();

        log("user", user);

        if (user !== null) {
          const res = await fs.getDataQuery("user", "email", user.email);
          res.forEach((v) => {
            const type = v.data().type;
            if (type === "dokter") {
              navigate("/dokter");
            } else {
              navigate("/user");
            }
          });
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
