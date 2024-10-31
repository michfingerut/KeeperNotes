import { HeaderStyle, HeaderH1, LogOutButton } from '../styles/styles';

function Header(props) {
  ///////////////////// props /////////////////////
  const title = props.title;
  const setIsLogged = props.setIsLogged;
  /////////////////////////////////////////////////

  function logOut() {
    localStorage.setItem('uuid', '');
    localStorage.setItem('isLogged', false);
    setIsLogged(false);
  }

  return (
    <HeaderStyle>
      <HeaderH1>{title}</HeaderH1>
      <LogOutButton onClick={logOut}>Log out</LogOutButton>
    </HeaderStyle>
  );
}

export default Header;
