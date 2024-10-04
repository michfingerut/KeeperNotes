import KeeperMainPage from './components/KeeperMainPage';
import LogInPage from './components/LogInPage';
import './styles/App.css';
import React, { useState } from 'react';

//TODO: add login page
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(undefined);
  if (isLoggedIn) {
    return <KeeperMainPage />;
  } else {
    return <LogInPage logInFunc={setIsLoggedIn} setUserInfo={setUserInfo} />;
  }
}

export default App;
