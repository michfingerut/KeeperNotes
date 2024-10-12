import KeeperMainPage from './components/KeeperMainPage';
import LogInPage from './components/LogInPage';
import './styles/App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

//TODO: styled component

function App() {
  const [isLogged, setIsLogged] = useState(
    JSON.parse(localStorage.getItem('isLogged')),
  );
  const uuid = localStorage.getItem('uuid');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate('/login');
    } else {
      navigate('/');
    }
  }, [isLogged, navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={<KeeperMainPage uuid={uuid} setIsLogged={setIsLogged} />}
      ></Route>

      <Route
        path="/login"
        element={<LogInPage setIsLogged={setIsLogged} />}
      ></Route>
    </Routes>
  );
}

function RootApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default RootApp;
