import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Stack, Typography, Button, MenuItem } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AddAppointmentLogic from "./AddAppointmentLogic";
import { LoadingButton } from "@mui/lab";

const AddAppointment = () => {
  const { value, func } = AddAppointmentLogic();
  return (
    <Stack spacing={4}>
      {/* Make Appointment */}
      <Typography
        style={{
          fontFamily: "lato",
          fontSize: "28px",
          lineHeight: "43.2px",
          marginTop: "-14px",
        }}
      >
        Buat Perjanjian
      </Typography>

      {/* TextField 1*/}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          name="nama_lengkap"
          onChange={func.onChange}
          size="small"
          label={
            <Typography
              style={{
                fontFamily: "lato",
                fontSize: "21px",
              }}
            >
              your name
            </Typography>
          }
          value={value.input.nama_lengkap}
          variant="outlined"
          sx={{ width: "333px" }}
          InputProps={{
            style: { height: 56 },
          }}
        />
        <TextField
          name="email"
          onChange={func.onChange}
          size="small"
          value={value.input.email}
          disabled
          label={
            <Typography
              style={{
                fontFamily: "lato",
                fontSize: "21px",
              }}
            >
              your email
            </Typography>
          }
          variant="outlined"
          sx={{ width: "333px" }}
          InputProps={{
            style: { height: 56 },
          }}
        />
        <TextField
          name="no_hp"
          onChange={func.onChange}
          size="small"
          label={
            <Typography
              style={{
                fontFamily: "lato",
                fontSize: "18px",
              }}
            >
              your phone
            </Typography>
          }
          variant="outlined"
          sx={{ width: "333px" }}
          InputProps={{
            style: { height: 56 },
          }}
        />
      </Box>
      {/* TextField 2*/}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker onChange={func.onChangeDate} sx={{ width: "333px" }} />
        </LocalizationProvider>
        <TextField
          name="gender"
          onChange={func.onChange}
          label={
            <Typography
              style={{
                fontFamily: "lato",
                fontSize: "21px",
              }}
            >
              gender
            </Typography>
          }
          select
          fullWidth
          size="small"
          variant="outlined"
          InputProps={{
            style: { height: 56 },
          }}
          sx={{ width: "333px" }}
          value={value.input.gender}
        >
          <MenuItem value="laki-laki">Laki-laki</MenuItem>
          <MenuItem value="perempuan">Perempuan</MenuItem>
        </TextField>

        <TextField
          onChange={func.onChangeDokter}
          label={
            <Typography
              style={{
                fontFamily: "lato",
                fontSize: "18px",
              }}
            >
              Pilih Dokter
            </Typography>
          }
          InputProps={{
            style: { height: 56 },
          }}
          select
          fullWidth
          size="small"
          variant="outlined"
          sx={{ width: "333px" }}
          // onChange={func.onChange}
        >
          {value.dokter.map((e) => (
            <MenuItem value={`${e.email}-${e.nama_dokter}`}>
              {e.nama_dokter}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {/* Message optional */}
      <TextField
        name="message"
        onChange={func.onChange}
        label={
          <Typography style={{ fontFamily: "lato", fontSize: "21px" }}>
            silahkan isi keluhan anda
          </Typography>
        }
        multiline
        rows={4}
      />

      {/* Button */}
      <Stack style={{ margin: "30px auto" }}>
        <LoadingButton
          variant="contained"
          loading={value.loading}
          loadingPosition="end"
          style={{
            width: "250px",
            backgroundColor: "#8BD7EF",
            borderRadius: "8px",
            fontFamily: "lato",
            textTransform: "none",
            fontSize: "20px",
          }}
          onClick={func.onMake}
        >
          buat temu janji
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default AddAppointment;
