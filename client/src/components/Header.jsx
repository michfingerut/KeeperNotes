//External modules
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

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

  const styling = { color: 'white', fontWeight: 'bold', fontSize: '1.25rem' };

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
        <Breadcrumbs aria-label="breadcrumb">
          {title ? (
            <div>
              <Link underline="hover" color="inherit" href="/home" sx={styling}>
                Keeper
              </Link>
              <Typography component="span" sx={styling}>
                {''} / {title}
              </Typography>
            </div>
          ) : (
            <div>
              <Typography component="span" sx={styling}>
                Keeper
              </Typography>
            </div>
          )}
        </Breadcrumbs>

        {/* <Button onClick={logOut} color="inherit">
          Logout
        </Button> */}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
