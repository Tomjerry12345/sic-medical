import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Stack, Typography } from "@mui/material";
import Logic from "./Logic";
import { LoadingButton } from "@mui/lab";

const AddDokterPage = () => {
  const { value, func } = Logic();
  return (
    <Stack spacing={4} direction="column" alignItems="center">
      {/* Make Appointment */}
      <Typography
        style={{
          fontFamily: "lato",
          fontWeight: "bold",
          fontSize: 24,
        }}
      >
        Tambah Dokter
      </Typography>

      {/* TextField 1*/}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TextField
          name="nama_dokter"
          onChange={func.onChange}
          size="small"
          label="Nama Dokter"
          value={value.input.nama_dokter}
          variant="outlined"
          sx={{
            width: 400,
            marginBottom: "16px",
          }}
        />

        <TextField
          name="spesialis"
          onChange={func.onChange}
          size="small"
          value={value.input.spesialis}
          label="Spesialis"
          variant="outlined"
          sx={{
            width: 400,
            marginBottom: "16px",
          }}
        />
        <TextField
          name="email"
          onChange={func.onChange}
          size="small"
          label="Email"
          variant="outlined"
          value={value.input.email}
          sx={{
            width: 400,
            marginBottom: "16px",
          }}
        />
      </Box>

      {/* Button */}
      <LoadingButton
        variant="contained"
        loading={value.loading}
        loadingPosition="end"
        style={{
          backgroundColor: "#8BD7EF",
          borderRadius: "8px",
          fontFamily: "lato",
          textTransform: "none",
        }}
        onClick={func.onMake}
      >
        Tambah
      </LoadingButton>
    </Stack>
  );
};

export default AddDokterPage;
