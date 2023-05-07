import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NavbarComponent from "../../component/navbar/NavbarComponent";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

function UserPage() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavbarComponent />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default UserPage;
