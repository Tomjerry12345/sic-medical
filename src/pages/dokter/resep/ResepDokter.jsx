import { Button, Stack, TextField, Typography } from "@mui/material";

const ResepDokter = () => {
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

      {/* Message optional */}
      <TextField
        name="resep"
        placeholder="Silahkan mengisi resep pasien..."
        multiline
        rows={8}
        onChange={func.onChange}
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
          Make recipe
        </Button>
      </Stack>
    </Stack>
  );
};

export default ResepDokter;
