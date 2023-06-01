import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import NavbarComponent from "../../component/navbar/NavbarComponent";
import { Outlet } from "react-router-dom";
import { menuPasien } from "../../values/Constant";

const drawerWidth = 240;

function PasienPage() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavbarComponent menu={menuPasien} type="user" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default PasienPage;
