//External modules
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from 'react-router-dom';

//Internal modules
import KeeperMainPage from './views/KeeperMainPage';
import LogInPage from './views/LogInPage';

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
      navigate('/home');
    }
  }, [isLogged, navigate]);

  return (
    <Routes>
      <Route
        path="/home"
        element={<KeeperMainPage uuid={uuid} setIsLogged={setIsLogged} />}
      />
      <Route path="/login" element={<LogInPage setIsLogged={setIsLogged} />} />
      <Route
        path="/"
        element={isLogged ? <Navigate to="/home" /> : <Navigate to="/login" />}
      />
    </Routes>
  );
}

//useNavigate() can be used only in the context of <Router> component
function RootApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default RootApp;
