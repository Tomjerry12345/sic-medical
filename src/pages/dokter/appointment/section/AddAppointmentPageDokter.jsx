import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Stack, Typography, Button } from "@mui/material";

const AddAppointmentDokter = () => {
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
        Make Appointment
      </Typography>

      {/* TextField 1*/}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          id=""
          size="small"
          label={
            <Typography
              style={{
                fontFamily: "lato",
                fontSize: "21px",
                marginTop: "-6px",
              }}
            >
              your name
            </Typography>
          }
          variant="outlined"
          sx={{ width: "333px" }}
        />
        <TextField
          id=""
          size="small"
          label={
            <Typography
              style={{
                fontFamily: "lato",
                fontSize: "21px",
                marginTop: "-6px",
              }}
            >
              your email
            </Typography>
          }
          variant="outlined"
          sx={{ width: "333px" }}
        />
        <TextField
          id=""
          size="small"
          label={
            <Typography
              style={{
                fontFamily: "lato",
                fontSize: "21px",
                marginTop: "-6px",
              }}
            >
              your phone
            </Typography>
          }
          variant="outlined"
          sx={{ width: "333px" }}
        />
      </Box>
      {/* TextField 2*/}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          id=""
          size="small"
          label={
            <Typography
              style={{
                fontFamily: "lato",
                fontSize: "21px",
                marginTop: "-6px",
              }}
            >
              appointment date
            </Typography>
          }
          variant="outlined"
          sx={{ width: "333px" }}
        />
        <TextField
          id=""
          size="small"
          label={
            <Typography
              style={{
                fontFamily: "lato",
                fontSize: "21px",
                marginTop: "-6px",
              }}
            >
              gender
            </Typography>
          }
          variant="outlined"
          sx={{ width: "333px" }}
        />
        <TextField
          id=""
          size="small"
          label={
            <Typography
              style={{
                fontFamily: "lato",
                fontSize: "21px",
                marginTop: "-6px",
              }}
            >
              type of diseases
            </Typography>
          }
          variant="outlined"
          sx={{ width: "333px" }}
        />
      </Box>

      {/* Message optional */}
      <TextField
        label={
          <Typography style={{ fontFamily: "lato", fontSize: "21px" }}>
            messages (optional)
          </Typography>
        }
        multiline
        rows={4}
      />

      {/* Button */}
      <Stack style={{ margin: "30px auto" }}>
        <Button
          variant="contained"
          style={{
            width: "250px",
            height: "42px",
            backgroundColor: "#8BD7EF",
            borderRadius: "8px",
            fontFamily: "lato",
            textTransform: "none",
            fontSize: "20px",
          }}
        >
          Make an appointment
        </Button>
      </Stack>
    </Stack>
  );
};

export default AddAppointmentDokter;
