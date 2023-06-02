import { Stack, Typography, Card, CardContent, Grid } from "@mui/material";
import Logic from "./Logic";
import { log } from "../../../values/Utilitas";

const CallingPage = () => {
  const { value, func } = Logic();

  log("value.userVideo", value.userVideo);

  return (
    <Grid
      container
      spacing={2}
      height="600px"
      style={{
        backgroundColor: "#EEF5F5",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      {value.stream && (
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            {value.name || "Name"}
          </Typography>
          <video playsInline muted ref={value.myVideo} autoPlay />
        </Grid>
      )}

      {value.callAccepted && !value.callEnded && (
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            {value.name || "Name"}
          </Typography>
          <video playsInline muted ref={value.userVideo} autoPlay />
        </Grid>
      )}
    </Grid>
  );
};

export default CallingPage;
