//External modules
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

//Internal modules
import { backGroundLightGray } from "../styles/styles";

//TODO: styling!
function NavBar(props) {
  ///////////////////// props /////////////////////
  const { menuItems, handleLogOut } = props;
  /////////////////////////////////////////////////

  const [open, setOpen] = useState(false);
  const hoverStyle = {
    "&:hover": {
      backgroundColor: backGroundLightGray,
    },
  };
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: 200 }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.itemName}
            disablePadding
          >
            <ListItemButton
              onClick={item.handleClick}
              sx={hoverStyle}
            >
              <ListItemIcon>{item.icon()}</ListItemIcon>
              <ListItemText primary={item.itemName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Log Out"].map((text) => (
          <ListItem
            key={text}
            disablePadding
          >
            <ListItemButton
              onClick={handleLogOut}
              sx={hoverStyle}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default NavBar;
