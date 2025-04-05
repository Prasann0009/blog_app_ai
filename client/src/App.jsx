import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./feature/Home";
import Login from "./feature/auth/login";
import Signup from "./feature/auth/Signup";
import NavigationBar from "./feature/navbar";

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index Component={Home} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  const isLoggedIn = false;

  if (isLoggedIn) {
    return <PrivateRoutes />;
  }
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
