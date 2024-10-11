import KeeperMainPage from './components/KeeperMainPage';
import LogInPage from './components/LogInPage';
import './styles/App.css';
import React, { useState } from 'react';

function App() {
  const uuid = localStorage.getItem('uuid');

  if (localStorage.getItem('isLogged')) {
    //TODO: routing
    //TODO: logout
    //TODO: styled component
    return <KeeperMainPage uuid={uuid} />;
  } else {
    return <LogInPage />;
  }
}

export default App;
