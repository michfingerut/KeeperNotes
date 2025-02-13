//External modules
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

//Internal modules
import { backGroundLightBrown } from "../styles/styles";
import NavBar from "./NavBar";
import { useAuth } from "../utils/Context";

function Header(props) {
  const { setIsLogged, setUUID } = useAuth();
  ///////////////////// props /////////////////////
  const { title, menuItems } = props;
  /////////////////////////////////////////////////

  function logOut() {
    setIsLogged(false);
  }

  const styling = { color: "white", fontWeight: "bold", fontSize: "1.25rem" };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: backGroundLightBrown,
      }}
    >
      <Toolbar>
        <NavBar
          menuItems={menuItems}
          handleLogOut={logOut}
        />
        <Breadcrumbs aria-label="breadcrumb">
          {title ? (
            <div>
              <Link
                underline="hover"
                color="inherit"
                href="/home"
                sx={styling}
              >
                Keeper
              </Link>
              <Typography
                component="span"
                sx={styling}
              >
                {""} / {title}
              </Typography>
            </div>
          ) : (
            <div>
              <Typography
                component="span"
                sx={styling}
              >
                Keeper
              </Typography>
            </div>
          )}
        </Breadcrumbs>
      </Toolbar>
    </AppBar>
  );
}

export default React.memo(Header, (prevPros, newProps) => {
  return true;
});
