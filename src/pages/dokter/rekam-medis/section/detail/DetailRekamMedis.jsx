import { Button, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Logic from "./Logic";

const rows = [
  { id: 1, tanggal: "26/06/2023", keluhan: "Stress", tindakan: "Tidur" },
];

const columns = [
  { field: "date", headerName: "Tanggal", width: 300 },
  { field: "keluhan", headerName: "Keluhan", width: 300 },
  { field: "tindakan", headerName: "Tindakan", width: 300 },
];

const DetailRekamMedis = () => {
  const { value, func } = Logic();
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Typography
        variant="h4"
        style={{ marginTop: "-15px", marginBottom: "48px" }}
      >
        Rekam Medis
      </Typography>

      <Stack direction="row">
        <Typography sx={{ marginRight: 8 }}>Nomor</Typography>
        <Typography sx={{ marginRight: 2 }}>:</Typography>
        <Typography>001</Typography>
      </Stack>

      <Stack direction="row">
        <Typography sx={{ marginRight: 2.8 }}>Nama Pasien </Typography>
        <Typography sx={{ marginRight: 2 }}>:</Typography>
        <Typography>{value.item.nama_lengkap}</Typography>
      </Stack>

      <Stack direction="row">
        <Typography sx={{ marginRight: 2 }}>Jenis Kelamin</Typography>
        <Typography sx={{ marginRight: 2 }}>:</Typography>
        <Typography>{value.item.gender}</Typography>
      </Stack>

      <Stack direction="row">
        <Typography sx={{ marginRight: 9 }}>Umur</Typography>
        <Typography sx={{ marginRight: 2 }}>:</Typography>
        <Typography>5 Tahun</Typography>
      </Stack>

      <Stack
        direction="row"
        sx={{
          marginBottom: 4,
        }}
      >
        <Typography sx={{ marginRight: 7.7 }}>Alamat</Typography>
        <Typography sx={{ marginRight: 2 }}>:</Typography>
        <Typography>Samarinda</Typography>
      </Stack>

      <Button
        variant="contained"
        sx={{
          marginBottom: 3,
          background: "#1ca1ca",
        }}
        onClick={func.onMoveAdd}
      >
        Tambah diagnosa
      </Button>
      <DataGrid rows={value.data} columns={columns} />
    </div>
  );
};

export default DetailRekamMedis;