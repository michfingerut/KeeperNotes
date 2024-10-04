import KeeperMainPage from './components/KeeperMainPage';
import LogInPage from './components/LogInPage';
import './styles/App.css';
import React, { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    uuid: '',
  });
  if (isLoggedIn) {
    //TODO: if logged in then refresh should not go to log in page
    return <KeeperMainPage userInfo={userInfo} />;
  } else {
    return (
      <LogInPage setIsLoggedIn={setIsLoggedIn} setUserInfo={setUserInfo} />
    );
  }
}

export default App;
