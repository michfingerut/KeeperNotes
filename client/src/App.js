//External modules
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

//Internal modules
import KeeperMainPage from "./views/KeeperMainPage";
import LogInPage from "./views/LogInPage";
import GroupPage from "./views/GroupPage";
import { AuthProvider, useAuth } from "./utils/Context";

function App() {
  const { isLogged } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/login");
    } else if (localStorage.getItem("groupId").length === 0) {
      navigate("/home");
    }
  }, [isLogged, navigate]);

  return (
    //TODO: transition between routes is not smooth
    <Routes>
      <Route
        path="/home"
        element={<KeeperMainPage />}
      />
      <Route
        path="/:groupId"
        element={<GroupPage />}
      />

      <Route
        path="/login"
        element={<LogInPage />}
      />
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
      <AuthProvider>
        <App />
      </AuthProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default RootApp;
