/* eslint-disable react-hooks/exhaustive-deps */
import FirebaseServices from "services/FirebaseServices";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { log } from "values/Utilitas";
import { useNavigate } from "react-router";

const Logic = () => {
  const fs = FirebaseServices();

  const navigate = useNavigate();
  const [rows, setRows] = useState([]);

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
      headerName: "Dokter",
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
          let n = [...rows];
          const id = params.id;
          const d = n[id - 1];
          onEditDokter(d);
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
        const onClick = async (e) => {
          e.stopPropagation(); // don't select this row after clicking
          let n = [...rows];
          const id = params.id;
          const d = n[id - 1];
          const success = await fs.deleteUserServices(
            "dokter",
            d.email,
            d.password,
            d.id
          );
          if (success) {
            onGetDokter();
          } else {
            alert("terjadi kesalahan");
          }
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

  const onGetDokter = async () => {
    const result = await fs.getDataCollection("dokter");
    const r = reformatNo(result);
    log({ r });
    setRows(r);
  };

  const reformatNo = (d) => {
    const newArr = d.map((e, no) => ({
      ...e,
      no: no + 1,
    }));
    return newArr;
  };

  const onTambahDokter = async () => {
    navigate("add");
  };

  const onEditDokter = async (row) => {
    navigate("edit", {
      state: row,
    });
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
