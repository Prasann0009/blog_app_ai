import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./feature/Home";
import Login from "./feature/auth/login";
import Signup from "./feature/auth/Signup";
import NavigationBar from "./feature/navbar";
import { useSelector } from "react-redux";
import { isLoggedInSelector } from "./feature/auth/authSelectors";

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index Component={Home} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  const isLoggedIn = useSelector(isLoggedInSelector);
  // console.log({ isLoggedIn });

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
