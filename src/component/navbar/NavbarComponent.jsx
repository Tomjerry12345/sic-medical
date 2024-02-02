/* eslint-disable react-hooks/exhaustive-deps */
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import FirebaseServices from "services/FirebaseServices";
import ModalComponent from "../modal/Modal";

const drawerWidth = 240;

const NavbarComponent = ({ menu, type }) => {
  const fs = FirebaseServices();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const split = pathname.split("/");
  const urlpath = `/${split[1]}${split[2] === undefined ? "" : `/${split[2]}`}`;

  const [value, setValue] = useState({
    nama: "",
    image: "",
  });

  useEffect(() => {
    if (type === "admin") {
      setValue({
        ...value,
        nama: "Admin",
        tipe: "",
        image:
          "https://firebasestorage.googleapis.com/v0/b/sic-medical-11a53.appspot.com/o/images%2Fgambar_admin-removebg-preview.png?alt=media&token=e0b0c088-c3f8-4c05-b396-ce8eca6e9a68&_gl=1*clrth0*_ga*MzU4MTQwNTg2LjE2ODY5MDEwMzI.*_ga_CW55HF8NVT*MTY5NTk3ODE1MC4zMC4xLjE2OTU5NzgyMDYuNC4wLjA.",
      });
    } else {
      getUser();
    }
  }, []);

  const getUser = async () => {
    const user = await fs.getCurrentUser();
    const data = await fs.getDataQuery(type, "email", user.email);
    if (data[0] === undefined) navigate("/login");
    setValue({
      ...value,
      nama: type === "dokter" ? data[0].nama_dokter : data[0].nama_lengkap,
      tipe: type === "dokter" ? `Dokter : ${data[0].spesialis}` : data[0].type,
      image: data[0].image,
    });
  };

  const drawer = (
    <div>
      {/* RSUD Siwa */}
      <Stack sx={{ textAlign: "center", p: 2 }}>
        <Typography
          sx={{ fontFamily: "lato", fontSize: "25px", fontWeight: "500" }}
        >
          Klinik Hikmah
        </Typography>
        {/* images */}

        <img
          src={value.image}
          width="150"
          height="150"
          alt=""
          style={{
            margin: "auto",
            marginTop: "14px",
            marginBottom: "8px",
            borderRadius: "50%",
          }}
        />

        {/* monkey d luffy */}
        <Typography style={{ fontFamily: "lato", fontSize: "22px", mt: 6 }}>
          {value.nama}
        </Typography>
        {/* button */}
        {type !== "admin" ? (
          <Button
            variant="contained"
            style={{
              width: "130px",
              height: "43px",
              backgroundColor: "#8BD7EF",
              fontSize: "24px",
              fontFamily: "lato",
              margin: "auto",
              marginTop: "10px",
              textTransform: "none",
            }}
            size="small"
          >
            <ModalComponent
              modal="Detail"
              nama={value.nama}
              image={value.image}
              tipe={value.tipe}
            />
          </Button>
        ) : null}
      </Stack>
      <List>
        {menu.map((val, index) => (
          <ListItem key={val.title} disablePadding>
            <ListItemButton
              style={{ fontFamily: "lato" }}
              onClick={async () => {
                if (val.router !== "") {
                  navigate(val.router);
                } else {
                  try {
                    await fs.onSignOut();
                    navigate("/");
                  } catch (error) {
                    alert(error);
                  }
                }
              }}
            >
              <Stack
                direction="row"
                style={{
                  width: "200px",
                  padding: "8px",
                  borderRadius: "8px",
                  background: val.router === urlpath ? "#1ca1ca" : "#fff",
                  boxShadow: " 0px 4px 4px rgba(0, 0, 0, 0.25)",
                }}
              >
                <ListItemIcon>{val.icon}</ListItemIcon>
                <ListItemText
                  style={{ fontFamily: "lato" }}
                  primary={val.title}
                />
              </Stack>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, height: "100%" }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        PaperProps={{
          sx: {
            backgroundColor: "#F0F8FF",
            color: "black",
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default NavbarComponent;
