import FirebaseServices from "services/FirebaseServices";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { log } from "values/Utilitas";
import { useNavigate } from "react-router";

const Logic = () => {
  const fs = FirebaseServices();

  const navigate = useNavigate();

  const [rows, setRows] = useState([
    {
      no: 0,
      nama_dokter: "",
      spesialis: "",
      email: "",
    },
  ]);

  const [input, setInput] = useState();

  const columns = [
    {
      field: "no",
      headerName: "No",
      flex: 1,
      minWidth: 50,
      disableColumnMenu: true,
    },
    {
      field: "nama_dokter",
      headerName: "Nama Dokter",
      flex: 1,
      minWidth: 270,
      disableColumnMenu: true,
    },
    {
      field: "spesialis",
      headerName: "Spesialis",
      flex: 1,
      minWidth: 220,
      disableColumnMenu: true,
    },

    {
      field: "email",
      headerName: "Email",
      disableColumnMenu: true,
      flex: 1,
      minWidth: 270,
    },
    {
      field: "edit",
      headerName: "Edit",
      headerAlign: "center",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          const n = [...rows];
          const pId = params.id;
        };

        return (
          <Button varian="contained" fullWidth onClick={onClick}>
            Edit
          </Button>
        );
      },
    },
    {
      field: "hapus",
      headerName: "Hapus",
      headerAlign: "center",
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          let n = [...rows];
          const id = params.id;
          n = n.splice(id, 1);
          n = reformatNo(n);
          setRows(n);
        };

        return (
          <Button varian="contained" fullWidth onClick={onClick}>
            Hapus
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    onGetDokter();
  }, []);

  const reformatNo = (d) => {
    const newArr = d.map((e, no) => ({
      ...e,
      no: no + 1,
    }));
    return newArr;
  };

  const onGetDokter = async () => {
    const result = await fs.getDataCollection("dokter");
    const r = reformatNo(result);
    setRows(r);
  };

  const onTambahDokter = async () => {
    navigate("add");
  };

  return {
    value: {
      columns,
      rows,
    },
    func: {
      onTambahDokter,
    },
  };
};

export default Logic;
