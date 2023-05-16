import { useEffect, useState } from "react";
import { log } from "../../../values/Utilitas";
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
    log({ result });
    setData(result);
  };

  return {
    value: {
      data,
    },
    func: {
      onGetData,
    },
  };
};

export default KonsultasiPasienLogic;
