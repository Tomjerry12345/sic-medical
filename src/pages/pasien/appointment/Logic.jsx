import { useNavigate } from "react-router-dom";
import FirebaseServices from "services/FirebaseServices";
import { log } from "values/Utilitas";
import { useEffect, useState } from "react";

const Logic = () => {
  const [data, setData] = useState();

  const navigate = useNavigate();
  const fs = FirebaseServices();

  useEffect(() => {
    onGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMakeAppointment = () => {
    navigate("/pasien/appointment/add");
  };

  const onGetData = async () => {
    const user = await fs.getCurrentUser();
    const result = await fs.getDataQuery("appointment", "email", user.email);
    log({ result });
    setData(result);
  };

//   const onGetData = async () => {
//     const user = await fs.getCurrentUser();
//     const result = await fs.getDataQuery("appointment", "email", user.email);

//     // Mengubah huruf pertama menjadi huruf besar di setiap nilai properti 'gender'
//     const updatedResult = result.map((appointment) => {
//         appointment.gender = appointment.gender.charAt(0).toUpperCase() + appointment.gender.slice(1);
//         return appointment;
//     });

//     log({ updatedResult });
//     setData(updatedResult);
// };

  const onEdit = (row) => {
    navigate("/pasien/appointment/edit", {
      state: row,
    });
  };

  const onDelete = async (id) => {
    try {
      await fs.deletDoc("appointment", id);
      navigate(0);
    } catch (error) {
      alert(error);
    }
  };

  return {
    value: {
      data,
    },
    func: {
      onMakeAppointment,
      onEdit,
      onDelete,
    },
  };
};

export default Logic;
