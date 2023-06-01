import { Stack, Typography, Card, CardContent } from "@mui/material";
import CallingDokterLogic from "./CallingDokterLogic";

const CallingDokter = () => {
  const { value, func } = CallingDokterLogic();
  return (
    <Stack
      width="1080px"
      height="600px"
      style={{
        backgroundColor: "#EEF5F5",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <img
        src={value.state.image}
        alt=""
        width="957px"
        height="450px"
        style={{ margin: "auto", marginTop: "50px" }}
      />
      <Card style={{ margin: "auto", borderRadius: "16px" }}>
        <CardContent>
          <Typography fontWeight="600">Connect...</Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default CallingDokter;
