/* eslint-disable react-hooks/exhaustive-deps */
import { collection } from "@firebase/firestore";
import { db } from "config/FirebaseConfig";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import FirebaseServices from "services/FirebaseServices";

const Logic = () => {
  const fs = FirebaseServices();
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state.item;

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const res = await fs.getDataSpecifict(
      collection(db, "rekam-medis", item.email, "diagnosa")
    );
    setData(res);
  };

  const onMoveAdd = () => {
    navigate("/dokter/rekam-medis/add", {
      state: {
        item,
      },
    });
  };
  return {
    value: {
      item,
      data,
    },
    func: {
      onMoveAdd,
    },
  };
};

export default Logic;
