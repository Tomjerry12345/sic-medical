import { useNavigate } from "react-router-dom";
import FirebaseServices from "../../../services/FirebaseServices";
import { log } from "../../../values/Utilitas";
import { useEffect, useState } from "react";

const AppointmentLogicDokter = () => {
  const [data, setData] = useState();

  const fs = FirebaseServices();

  useEffect(() => {
    onGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGetData = async () => {
    const user = await fs.getCurrentUser();
    const result = await fs.getDataQuery(
      "appointment",
      "email_dokter",
      user.email
    );
    setData(result);
  };

  return {
    value: {
      data,
    },
    func: {},
  };
};

export default AppointmentLogicDokter;
