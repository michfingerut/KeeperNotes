import { HeaderStyle, HeaderH1, LogOutButton } from '../styles/styles';

function Header(props) {
  function logOut() {
    localStorage.setItem('uuid', '');
    localStorage.setItem('isLogged', false);
    props.setIsLogged(false);
  }

  return (
    <HeaderStyle>
      <HeaderH1>{props.title}</HeaderH1>
      <LogOutButton onClick={logOut}>Log out</LogOutButton>
    </HeaderStyle>
  );
}

export default Header;
