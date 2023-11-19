import { Button, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FirebaseServices from "services/FirebaseServices";
import { log, timestamp } from "values/Utilitas";

const Logic = () => {
  const location = useLocation();
  const fs = FirebaseServices();

  const sigCanvas = useRef();

  const navigate = useNavigate();

  const dataPasien = location.state;

  const [input, setInput] = useState({
    nama_pasien: dataPasien.nama_lengkap,
    tanggal_lahir: dataPasien.tanggal_lahir,
    jenis_kelamin: dataPasien.gender,
    tanda_tangan: null,
  });
  const [objObat, setObjObat] = useState(null);

  const [id, setId] = useState(null);

  const [openSignature, setOpenSignature] = useState(false);
  const [openTambahObat, setOpenTambahObat] = useState(false);
  const [loading, setLoading] = useState(false);

  const currentDate = new Date();

  const columns = [
    {
      field: "no",
      headerName: "No",
      minWidth: 70,
      flex: 1,
      sortable: false,
    },
    {
      field: "nama_obat",
      headerName: "Nama Obat",
      minWidth: 150,
      flex: 1,
      sortable: false,
    },
    {
      field: "jumlah",
      headerName: "Jumlah",
      minWidth: 100,
      flex: 1,
      sortable: false,
    },
    {
      minWidth: 300,
      flex: 1,
      field: "aturan_pakai",
      headerName: "Aturan Pakai",
      sortable: false,
    },
    {
      field: "edit",
      headerName: "Edit",
      align: "center",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          const n = [...rows];
          const pId = params.id;
          setId(pId - 1);
          setObjObat(n[pId - 1]);
          onOpenTambahObat();
        };

        return (
          <Button
            varian="contained"
            fullWidth
            onClick={onClick}
            sx={{
              marginLeft: "-48px",
            }}
          >
            Edit
          </Button>
        );
      },
    },
    {
      field: "hapus",
      headerName: "Hapus",
      sortable: false,
      // align: "center",

      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          let n = [...rows];
          const id = params.id;
          n = n.filter((item) => item.no !== id);
          n = reformatNo(n);
          setRows(n);
        };

        return (
          <Button
            varian="contained"
            fullWidth
            onClick={onClick}
            sx={{
              marginLeft: "-16px",
            }}
          >
            Hapus
          </Button>
        );
      },
    },
  ];

  const [rows, setRows] = useState([]);

  const reformatNo = (d) => {
    const newArr = d.map((e, no) => ({
      ...e,
      no: no + 1,
    }));
    log({ newArr });
    return newArr;
  };

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const onChangeDate = (e, key) => {
    setInput({
      ...input,
      [key]: `${e["$y"]}-${e["$M"] + 1}-${e["$D"]}`,
    });
  };

  const saveSignature = () => {
    const signatureData = sigCanvas.current.toDataURL();
    log({ signatureData });

    setInput({
      ...input,
      tanda_tangan: signatureData,
    });
    onCloseSignature();
    // Lakukan sesuatu dengan data tanda tangan, seperti mengirim ke server
  };

  const onTambahObat = (v) => {
    const n = {
      ...v,
      no: rows.length + 1,
    };
    setRows([...rows, n]);
    setObjObat(null);
    onCloseTambahObat();
  };

  const onEditObat = (v) => {
    log({ v });
    let n = [...rows];
    n[id] = v;
    setRows(n);
    onCloseTambahObat();
  };

  const sendRecipe = async () => {
    try {
      setLoading(true);
      const user = await fs.getCurrentUser();
      const dataDokter = await fs.getDataQuery("dokter", "email", user.email);

      const i = {
        ...input,
        list_obat: rows,
        nama_dokter: dataDokter[0].nama_dokter,
        spesialis: dataDokter[0].spesialis,
        pasienEmail: dataPasien.email,
        dokterEmail: user.email,
        timestamp: timestamp(),
      };

      log({ i });

      await fs.addData("resep", i);
      await fs.addData("pemberitahuan", {
        email_dokter: user.email,
        email_pasien: dataPasien.email,
        new: true,
        type: "resep",
      });

      setLoading(false);

      navigate("/");
    } catch (e) {
      alert(e);
    }
  };

  const onOpenSignature = () => {
    setOpenSignature(true);
  };
  const onCloseSignature = () => {
    setOpenSignature(false);
  };
  const onOpenTambahObat = () => {
    setOpenTambahObat(true);
  };
  const onCloseTambahObat = () => {
    setOpenTambahObat(false);
  };

  return {
    value: {
      input,
      sigCanvas,
      openSignature,
      openTambahObat,
      dataPasien,
      currentDate,
      columns,
      rows,
      objObat,
      loading,
    },
    func: {
      sendRecipe,
      onChange,
      onChangeDate,
      saveSignature,
      onOpenSignature,
      onCloseSignature,
      onOpenTambahObat,
      onCloseTambahObat,
      onTambahObat,
      onEditObat,
    },
  };
};

export default Logic;
