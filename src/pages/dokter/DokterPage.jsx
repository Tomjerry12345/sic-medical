import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import NavbarComponent from "component/navbar/NavbarComponent";
import { Outlet, useNavigate } from "react-router-dom";
import { menuDokter } from "values/Constant";
import { SocketContext } from "services/Context";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Snackbar,
  Typography,
} from "@mui/material";

const drawerWidth = 240;

function DokterPage() {
  const navigate = useNavigate();
  const { call, callAccepted, leaveCall } = React.useContext(SocketContext);
  const [open, setOpen] = React.useState(true);
  React.useEffect(() => {
    const path = window.location.href;
    if (path === "http://localhost:3000/dokter")
      navigate("/dokter/appointment");
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavbarComponent menu={menuDokter} type="dokter" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          // width: { sm: `calc(100% - ${drawerWidth}px)`, md: "100%" },
        }}
      >
        <Outlet />
      </Box>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={call.isReceivingCall && !callAccepted && open}
        message="I love snacks"
        autoHideDuration={6000}
        key={1}
        children={
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                {call.name} memanggil....
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-evenly" }}>
              <Button
                color="success"
                size="small"
                onClick={() => {
                  setOpen(false);
                  navigate("/dokter/konsultasi/calling", {
                    state: {
                      type: "answer",
                    },
                  });
                }}

                // onClick={answerCall}
              >
                Terima
              </Button>
              <Button
                color="error"
                size="small"
                onClick={() => {
                  setOpen(false);
                  window.location.replace("http://localhost:3000/");
                }}
              >
                Tolak
              </Button>
            </CardActions>
          </Card>
        }
      />
    </Box>
  );
}

export default DokterPage;
