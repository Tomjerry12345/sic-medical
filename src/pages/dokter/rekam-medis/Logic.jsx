import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { log } from "values/Utilitas";
import FirebaseServices from "../../../services/FirebaseServices";

const Logic = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const fs = FirebaseServices();

  useEffect(() => {
    onGetData();
  }, []);

  const onGetData = async () => {
    try {
      const result = await fs.getDataCollection("user");
      setData(result);
    } catch (error) {
      alert(error);
    }
  };

  const onMove = (item) => {
    navigate("/dokter/rekam-medis/detail", {
      state: {
        item: item,
      },
    });
  };

  return {
    value: {
      data,
    },
    func: {
      onGetData,
      onMove,
    },
  };
};

export default Logic;
