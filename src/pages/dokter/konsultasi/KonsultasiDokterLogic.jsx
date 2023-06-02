import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const onMoveToChat = (email, nama, image, idCall) => {
    navigate("/dokter/konsultasi/chat", {
      state: {
        email: email,
        nama: nama,
        image: image,
        idCall: idCall,
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
