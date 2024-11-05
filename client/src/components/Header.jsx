//External modules
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

//Internal modules
import KeeperMenu from './Menu';
import { backGroundLightBrown } from '../styles/styles';

function Header(props) {
  ///////////////////// props /////////////////////
  const { title, setIsLogged, menuItems } = props;
  /////////////////////////////////////////////////

  function logOut() {
    localStorage.setItem('uuid', '');
    localStorage.setItem('isLogged', false);
    setIsLogged(false);
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: backGroundLightBrown,
      }}
    >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <KeeperMenu
            menuIcon={() => {
              return <MenuIcon />;
            }}
            menuItems={menuItems}
          />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Button onClick={logOut} color="inherit">
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
