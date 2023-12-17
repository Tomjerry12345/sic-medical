import FirebaseServices from "services/FirebaseServices";
import { useEffect, useState } from "react";

const Logic = () => {
  const [data, setData] = useState();

  const fs = FirebaseServices();

  useEffect(() => {
    onGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGetData = async () => {
    const user = await fs.getCurrentUser();
    const result = await fs.getDataQuery("appointment", "email_dokter", user.email);
    setData(result);
  };

  return {
    value: {
      data,
    },
    func: {},
  };
};

export default Logic;
