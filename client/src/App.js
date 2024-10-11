import KeeperMainPage from './components/KeeperMainPage';
import LogInPage from './components/LogInPage';
import './styles/App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [isLogged, setIsLogged] = useState(
    JSON.parse(localStorage.getItem('isLogged')),
  );
  const uuid = localStorage.getItem('uuid');

  // return (
  //   <>
  //     <BrowserRouter basename="/keeper">
  //       <Routes>
  //         <Route
  //           path="/"
  //           element={<KeeperMainPage uuid={uuid} setIsLogged={setIsLogged} />}
  //         ></Route>

  //         <Route
  //           path="/login"
  //           element={<LogInPage setIsLogged={setIsLogged} />}
  //         ></Route>
  //       </Routes>
  //     </BrowserRouter>
  //   </>
  // );

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
