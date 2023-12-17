/* eslint-disable react-hooks/exhaustive-deps */
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import NavbarComponent from "component/navbar/NavbarComponent";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { menuAdmin } from "values/Constant";

function AdminPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const path = window.location.href;
    if (path === "http://localhost:3000/admin")
      navigate("/admin/tambah-dokter");
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <NavbarComponent menu={menuAdmin} type="admin" />
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
    </Box>
  );
}

export default AdminPage;
