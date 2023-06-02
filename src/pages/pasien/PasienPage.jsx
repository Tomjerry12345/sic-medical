import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import NavbarComponent from "../../component/navbar/NavbarComponent";
import { Outlet, useNavigate } from "react-router-dom";
import { menuPasien } from "../../values/Constant";
import { Button, Card, CardActions, CardContent, Snackbar, Typography } from "@mui/material";
import { SocketContext } from "../../services/Context";

const drawerWidth = 240;

function PasienPage() {
  const { call, callAccepted, answerCall } = React.useContext(SocketContext);
  const navigate = useNavigate();

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
        open={call.isReceivingCall && !callAccepted}
        message="I love snacks"
        autoHideDuration={6000}
        key={1}
        children={
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Typography variant="h6" color="text.secondary">
                Deceng menelpon....
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-evenly" }}>
              <Button
                color="success"
                size="small"
                // onClick={() => navigate("/pasien/konsultasi/calling")}
                onClick={answerCall}
              >
                Answer
              </Button>
              <Button color="error" size="small">
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
