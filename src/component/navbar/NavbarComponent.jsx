import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, Button, Modal } from "@mui/material";
import { namedMenuPasien } from "../../values/Constant";
import { useLocation, useNavigate } from "react-router-dom";
import { log } from "../../values/Utilitas";
import FirebaseServices from "../../services/FirebaseServices";
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
    getUser();
  }, []);

  const getUser = async () => {
    const user = await fs.getCurrentUser();

    const data = await fs.getDataQuery(type, "email", user.email);
    setValue({
      ...value,
      nama: type === "dokter" ? data[0].nama_dokter : data[0].nama_lengkap,
      tipe:
        type === "dokter" ? `Spesialis : ${data[0].spesialis}` :  data[0].type,
      image: data[0].image,
    });
  };

  const drawer = (
    <div>
      {/* darusullam media center */}
      <Stack sx={{ textAlign: "center", p: 2 }}>
        <Typography
          sx={{ fontFamily: "lato", fontSize: "24px", fontWeight: "400" }}
        >
          Darusallam Media Center
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
        ></img>
        {/* monkey d luffy */}
        <Typography style={{ fontFamily: "lato", fontSize: "22px", mt: 6 }}>
          {value.nama}
        </Typography>
        {/* button */}
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
