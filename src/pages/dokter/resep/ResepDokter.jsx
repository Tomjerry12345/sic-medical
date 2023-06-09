import { Button, Stack, TextField, Typography } from "@mui/material";
import Logic from "./Logic";

const ResepDokter = () => {
  const { value, func } = Logic();
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
        value={value.input.resep}
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
          onClick={func.sendRecipe}
        >
          Make recipe
        </Button>
      </Stack>
    </Stack>
  );
};

export default ResepDokter;
