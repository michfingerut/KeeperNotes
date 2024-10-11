import KeeperMainPage from './components/KeeperMainPage';
import LogInPage from './components/LogInPage';
import './styles/App.css';
import React, { useState } from 'react';

function App() {
  const [isLogged, setIsLogged] = useState(
    JSON.parse(localStorage.getItem('isLogged')),
  );
  const uuid = localStorage.getItem('uuid');

  if (isLogged) {
    //TODO: routing
    //TODO: logout
    //TODO: styled component
    return <KeeperMainPage uuid={uuid} setIsLogged={setIsLogged} />;
  } else {
    return <LogInPage setIsLogged={setIsLogged} />;
  }
}

export default App;
