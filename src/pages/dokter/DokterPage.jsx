/* eslint-disable react-hooks/exhaustive-deps */
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import NavbarComponent from "component/navbar/NavbarComponent";
import { Outlet, useNavigate } from "react-router-dom";
import { menuDokter } from "values/Constant";
import {
  Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import FirebaseServices from "services/FirebaseServices";
import { db } from "config/FirebaseConfig";
import {
  collection,
  onSnapshot,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { getLocal } from "values/Utilitas";

function DokterPage() {
  const navigate = useNavigate();
  // const { call, callAccepted } = useContext(SocketContext);
  // const [open, setOpen] = useState(true);

  const [openNotifAppointment, setOpenNotifAppointment] = useState(false);
  const [openNotifKonsultasi, setOpenNotifKonsultasi] = useState(false);

  const [messageNotifAppointment, setMessageNotifAppointment] = useState("");
  const [messageNotifKonsultasi, setMessageNotifKonsultasi] = useState("");

  const fs = FirebaseServices();

  useEffect(() => {
    const path = window.location.href;
    if (path === `${process.env.REACT_APP_BASE_URL}:3000/dokter`)
      navigate("/dokter/appointment");
  }, []);

  useEffect(() => {
    const email = getLocal("email");
    const colRef = collection(db, "pemberitahuan");
    //real time update
    const q = query(
      colRef,
      where("email_dokter", "==", email),
      where("new", "==", true)
    );
    onSnapshot(q, async (snapshot) => {
      let sumAppointment = 0;
      let sumKonsultasi = 0;
      for (const doc of snapshot.docs) {
        const d = doc.data();
        const isNew = d.new;

        if (isNew === true) {
          await fs.updateDocX("pemberitahuan", doc.id, {
            new: false,
          });

          if (d.type === "konsultasi") sumKonsultasi += 1;
          else sumAppointment += 1;
        }
      }

      if (sumKonsultasi > 0) {
        setMessageNotifAppointment(`${sumKonsultasi} pemberitahuan konsultasi`);
        setOpenNotifAppointment(true);
      }

      if (sumAppointment > 0) {
        setMessageNotifKonsultasi(
          `${sumAppointment} pemberitahuan appointment`
        );
        setOpenNotifKonsultasi(true);
      }
    });
  }, []);

  useEffect(() => {
    updateExpireTime();

    window.addEventListener("click", updateExpireTime);
    window.addEventListener("keypress", updateExpireTime);
    window.addEventListener("scroll", updateExpireTime);
    window.addEventListener("mousemove", updateExpireTime);

    return () => {
      window.removeEventListener("click", updateExpireTime);
      window.removeEventListener("keypress", updateExpireTime);
      window.removeEventListener("scroll", updateExpireTime);
      window.removeEventListener("mousemove", updateExpireTime);
    };
  }, []);

  const updateExpireTime = async () => {
    const expireTime = Date.now() + 60000;
    const email = getLocal("email");
    const colRef = collection(db, "dokter");
    const q = query(colRef, where("email", "==", email));
    const docs = await getDocs(q);

    let id;

    docs.forEach((v) => {
      id = v.id;
    });

    await fs.updateDocX("dokter", id, {
      expire_time: expireTime,
    });
  };

  const closeNotifAppointment = () => {
    setOpenNotifAppointment(false);
  };

  const closeNotifKonsultasi = () => {
    setOpenNotifKonsultasi(false);
  };

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

      {/* <Snackbar
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
      /> */}

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openNotifAppointment}
        onClose={closeNotifAppointment}
        message={messageNotifAppointment}
        key="top-right"
        autoHideDuration={5000}
      />

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openNotifKonsultasi}
        onClose={closeNotifKonsultasi}
        message={messageNotifKonsultasi}
        key="top-right-1"
        autoHideDuration={5000}
      />
    </Box>
  );
}

export default DokterPage;
