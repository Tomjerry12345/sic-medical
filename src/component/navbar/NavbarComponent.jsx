import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import React from 'react';
import { Box, Toolbar } from '@mui/material';
import { namedMenu } from '../../values/Constant';

const drawerWidth = 240;

const NavbarComponent = () => {



  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {namedMenu.map((val, index) => (
          <ListItem key={val.title} disablePadding>
            <ListItemButton>
              <ListItemIcon>{val.icon}</ListItemIcon>
              <ListItemText primary={val.title} />
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
            backgroundColor: "#8BD7EF",
            color: "black",
          }
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default NavbarComponent;
