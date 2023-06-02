import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FirebaseServices from "../../../services/FirebaseServices";

const KonsultasiPasienLogic = () => {
  const [data, setData] = useState();

  const navigate = useNavigate();
  const fs = FirebaseServices();

  useEffect(() => {
    onGetData();
  }, []);

  const onGetData = async () => {
    let result = await fs.getDataCollection("dokter");
    result = result.sort((a, b) => (a.nama_dokter > b.nama_dokter ? 1 : -1));
    setData(result);
  };

  const onMoveToChat = (email, nama) => {
    navigate("/pasien/konsultasi/chat", {
      state: {
        email: email,
        nama: nama,
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

export default KonsultasiPasienLogic;
