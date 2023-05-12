import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import React from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { namedMenu } from "../../values/Constant";

const drawerWidth = 240;

const NavbarComponent = () => {
  const drawer = (
    <div style={{ backgroundColor: "	#F0F8FF" }}>
      {/* darusullam media center */}
      <Stack style={{ textAlign: "center", marginTop: "10px" }}>
        <Typography
          style={{ fontFamily: "lato", fontSize: "26px", fontWeight: "400" }}
        >
          Darusallam Media Center
        </Typography>
        {/* images */}
        <img
          src="/images/luffy.png"
          width="174px"
          height="164px"
          style={{ margin: "auto", marginTop: "10px" }}
        ></img>
        {/* monkey d luffy */}
        <Typography
          style={{ fontFamily: "lato", fontSize: "28px", marginTop: "20px" }}
        >
          Monkey D Luffy
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
          Detail
        </Button>
      </Stack>
      <List>
        {namedMenu.map((val, index) => (
          <ListItem key={val.title} disablePadding>
            <ListItemButton style={{ fontFamily: "lato" }}>
              <Stack
                direction="row"
                style={{
                  width: "200px",
                  padding: "8px",
                  borderRadius: "8px",
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
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
            backgroundColor: "##F0F8FF",
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
