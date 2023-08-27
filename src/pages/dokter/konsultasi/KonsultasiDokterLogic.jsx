import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { log } from "values/Utilitas";
import FirebaseServices from "../../../services/FirebaseServices";

const KonsultasiDokterLogic = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const fs = FirebaseServices();

  useEffect(() => {
    onGetData();
  }, []);

  const getUser = async () => await fs.getCurrentUser();

  const onGetData = async () => {
    try {
      const user = await getUser();
      const userGroup = await fs.getGrupMessage(user.email);

      const promises = [];
      userGroup.map((email) => promises.push(getU(email)));

      const result = await Promise.all(promises);

      log({ result });

      setData(result);
    } catch (error) {
      alert(error);
    }
  };

  const getU = async (email) => {
    try {
      const result = await fs.getDataQuery("user", "email", email);
      return result[0];
    } catch (err) {
      throw err;
    }
  };

  const onMoveToChat = (item) => {
    navigate("/dokter/konsultasi/chat", {
      state: {
        ...item,
      },
    });
  };

  return {
    value: {
      data,
    },
    func: {
      onGetData,
      onMoveToChat,
    },
  };
};

export default KonsultasiDokterLogic;
