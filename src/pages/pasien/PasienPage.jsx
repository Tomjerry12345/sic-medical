import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import NavbarComponent from "../../component/navbar/NavbarComponent";
import { Outlet, useNavigate } from "react-router-dom";
import { menuPasien } from "../../values/Constant";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Snackbar,
  Typography,
} from "@mui/material";
import { SocketContext } from "../../services/Context";

const drawerWidth = 240;

function PasienPage() {
  const { call, callAccepted } = React.useContext(SocketContext);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);

  // React.useEffect(() => {
  //   if (!open) {
  //     navigate("/pasien/konsultasi/calling", {
  //       state: {
  //         type: "answer",
  //       },
  //     });
  //   }
  // }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavbarComponent menu={menuPasien} type="user" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
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
                  navigate("/pasien/konsultasi/calling", {
                    state: {
                      type: "answer",
                    },
                  });
                }}

                // onClick={answerCall}
              >
                Answer
              </Button>
              <Button
                color="error"
                size="small"
                onClick={() => {
                  setOpen(false);
                  window.location.replace("http://localhost:3000/");
                }}
              >
                Reject
              </Button>
            </CardActions>
          </Card>
        }
      />
    </Box>
  );
}

export default PasienPage;
