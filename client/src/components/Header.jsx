function Header(props) {
  function logOut() {
    localStorage.setItem('uuid', undefined);
    localStorage.setItem('isLogged', false);
    props.setIsLogged(false);
  }

  return (
    <div className="header">
      <h1>{props.title}</h1>
      <button onClick={() => logOut()}> Log out</button>
    </div>
  );
}

export default Header;
