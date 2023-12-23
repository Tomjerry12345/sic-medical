import { useState } from "react";
import FirebaseServices from "services/FirebaseServices";
import { useNavigate } from "react-router-dom";
import { log, timestamp } from "values/Utilitas";

const Logic = () => {
  const [input, setInput] = useState({
    nama_dokter: "",
    spesialis: "",
    image: "",
    email: "",
    password: "",
    waktu_konsultasi: {
      mulai: "",
      selesai: "",
    },
    timestamp: timestamp(),
  });

  const [loading, setLoading] = useState(false);
  const [img, setImage] = useState({
    currentFile: undefined,
    previewImage: undefined,
  });
  const [showPassword, setShowPassword] = useState(false);

  const fs = FirebaseServices();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onChangeDate = (e) => {
    setInput({
      ...input,
      date: `${e["$y"]}-${e["$M"] + 1}-${e["$D"]}`,
    });
  };

  const onChangeTime = (e, name) => {
    const time = `${e.hour()}:${e.minute()}`;

    setInput({
      ...input,
      waktu_konsultasi: { ...input.waktu_konsultasi, [name]: time },
    });
  };

  const onGetImage = (e) => {
    setImage({
      currentFile: e.target.files[0],
      previewImage: URL.createObjectURL(e.target.files[0]),
    });
  };

  const onMake = async () => {
    try {
      setLoading(true);
      const res = await fs.createUser(input.email, input.password);
      const image = await fs.uploadImage(img.currentFile);
      const data = {
        ...input,
        image,
      };
      log({ data });
      await fs.addData("dokter", data);
      navigate("/admin/tambah-dokter");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      log({ error });
      alert(error);
    }
  };

  return {
    value: {
      input,
      loading,
      img,
      showPassword,
    },
    func: {
      onChange,
      onChangeDate,
      onChangeTime,
      onMake,
      onGetImage,
      handleClickShowPassword,
    },
  };
};

export default Logic;
