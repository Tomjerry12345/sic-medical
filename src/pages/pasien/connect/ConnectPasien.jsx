import { Stack, Typography, Card, CardContent } from "@mui/material";
import CallEndIcon from "@mui/icons-material/CallEnd";

const ConnectPasien = () => {
  return (
    <Stack
      width="1080px"
      height="600px"
      style={{
        backgroundColor: "#EEF5F5",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div style={{ display: "flex" }}>
        <img
          src="https://images.alphacoders.com/164/164903.jpg"
          alt=""
          width="500px"
          height="450px"
          style={{ margin: "auto", marginTop: "50px" }}
        />
        <img
          src="https://images.alphacoders.com/164/164903.jpg"
          alt=""
          width="500px"
          height="450px"
          style={{ margin: "auto", marginTop: "50px" }}
        />
      </div>
      <Card
        style={{
          margin: "auto",
          width: "90px",
          height: "70px",
          borderRadius: "16px",
        }}
      >
        <CardContent>
          <Typography>
            <CallEndIcon
              fontSize="large"
              style={{ color: "#FF0000", marginLeft: "10px" }}
            />
          </Typography>
        </CardContent>
      </Card>
    </Stack>
  );
};

export default ConnectPasien;
