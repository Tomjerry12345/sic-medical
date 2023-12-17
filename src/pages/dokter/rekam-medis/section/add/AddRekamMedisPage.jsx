import * as React from "react";
import TextField from "@mui/material/TextField";
import { Stack, Typography, Card } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Logic from "./Logic";
import { LoadingButton } from "@mui/lab";

const AddRekamMedisPage = () => {
  const { value, func } = Logic();

  return (
    <div
      style={{
        background: "#e1e3e6",
        height: "calc(100vh - 48px)",
        display: "flex",
        aligItems: "center",
        justifyContent: "center",
        padding: "8px",
      }}
    >
      {/* Make Appointment */}

      <Card
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          style={{
            fontFamily: "lato",
            fontWeight: "bold",
            fontSize: "28px",
            lineHeight: "43.2px",
            marginBottom: "24px",
          }}
        >
          Tambah Diagnosa
        </Typography>

        {/* TextField 1*/}
        <Stack direction="column" spacing={2} sx={{ width: "333px" }}>
          <Typography>Tanggal</Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker onChange={func.onChangeDate} />
          </LocalizationProvider>
          <TextField
            name="keluhan"
            onChange={func.onChange}
            value={value.input.keluhan}
            label={
              <Typography
                style={{
                  fontFamily: "lato",
                }}
              >
                Keluhan
              </Typography>
            }
            variant="outlined"
            InputProps={{
              style: { height: 56 },
            }}
          />
          <TextField
            name="tindakan"
            onChange={func.onChange}
            value={value.input.tindakan}
            label={
              <Typography
                style={{
                  fontFamily: "lato",
                }}
              >
                Tindakan
              </Typography>
            }
            variant="outlined"
            InputProps={{
              style: { height: 56 },
            }}
          />
        </Stack>
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
            save
          </LoadingButton>
        </Stack>
      </Card>
    </div>
  );
};

export default AddRekamMedisPage;
