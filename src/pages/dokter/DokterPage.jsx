import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import NavbarComponent from "../../component/navbar/NavbarComponent";
import { Outlet, useNavigate } from "react-router-dom";
import { menuDokter } from "../../values/Constant";
import { log } from "../../values/Utilitas";
import { SocketContext } from "../../services/Context";
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
  const { call, callAccepted } = React.useContext(SocketContext);
  React.useEffect(() => {
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
                onClick={() => navigate("/dokter/konsultasi/chat")}
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

export default DokterPage;
