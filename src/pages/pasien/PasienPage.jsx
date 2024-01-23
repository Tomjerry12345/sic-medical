/* eslint-disable react-hooks/exhaustive-deps */
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
import { getLocal } from "values/Utilitas";
import { db } from "config/FirebaseConfig";
import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import FirebaseServices from "services/FirebaseServices";
import { useContext, useEffect, useState } from "react";


function PasienPage() {
  const { call, callAccepted } = useContext(SocketContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  const [messageResep, setMessageResep] = useState("");
  const [openNotifResep, setOpenNotifResep] = useState(false);

  const fs = FirebaseServices();

  useEffect(() => {
    fs.resetMessage()
    const email = getLocal("email");
    const colRef = collection(db, "pemberitahuan");
    //real time update
    const q = query(
      colRef,
      where("email_pasien", "==", email),
      where("new", "==", true)
    );

    onSnapshot(q, async (snapshot) => {
      let sumResep = 0;
      // let sumKonsultasi = 0;
      for (const doc of snapshot.docs) {
        const d = doc.data();
        const isNew = d.new;

        if (isNew === true) {
          await fs.updateDocX("pemberitahuan", doc.id, {
            new: false,
          });

          if (d.type === "resep") sumResep += 1;
          // else sumKonsultasi += 1;
        }
      }

      if (sumResep > 0) {
        setMessageResep(`${sumResep} pemberitahuan resep`);
        setOpenNotifResep(true);
      }

    });
    
  }, []);

  const closeNotifResep = () => {
    setOpenNotifResep(false);
  };

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
                  window.location.replace(`http://${process.env.REACT_APP_BASE_URL}:3000/`);
                }}
              >
                Reject
              </Button>
            </CardActions>
          </Card>
        }
      />

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openNotifResep}
        onClose={closeNotifResep}
        message={messageResep}
        key="top-right"
        autoHideDuration={5000}
      />
    </Box>
  );
}

export default PasienPage;
