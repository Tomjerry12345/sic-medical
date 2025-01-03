/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FirebaseServices from "services/FirebaseServices";
import { log } from "values/Utilitas";

const Logic = () => {
  const location = useLocation();
  const fs = FirebaseServices();
  const navigate = useNavigate();

  const [data, setData] = useState();

  useEffect(() => {
    getResep();
  }, []);

  const getResep = async () => {
    try {
      const user = await fs.getCurrentUser();
      const dokter = location.state;
      const res = await fs.getDataQuery2(
        "resep",
        "pasienEmail",
        user.email,
        "dokterEmail",
        dokter.email
      );
      //   const output = new Date(res[0].timestamp.seconds * 1000);
      setData(res);
    } catch (e) {
      log({ e });
    }
  };

  const previewResep = (d) => {
    navigate("/pasien/konsultasi/viewer-resep", {
      state: d,
    });
  };

  return {
    value: {
      data,
    },
    func: {
      previewResep,
    },
  };
};

export default Logic;
