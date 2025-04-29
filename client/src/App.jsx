import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./feature/Home";
import Login from "./feature/auth/login";
import Signup from "./feature/auth/Signup";
import NavigationBar from "./feature/navbar";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedInSelector } from "./feature/auth/authSelectors";
import { fetchAllGenres } from "./genres/genresMiddleware";
import { ApiStatus } from "./network/ApiStatus";
import { Spin } from "antd";

const NotFound = () => {
  // console.log("not found");
  const defaultGenreId =
    useSelector((state) => state.genres.genres)?.[0]?.id ?? "movies";
  return <Navigate to={`/genres/${defaultGenreId}`} />;
};

const PrivateRoutes = () => {
  const dispatch = useDispatch();
  const genresFetchingApiStatus = useSelector(
    (state) => state.genres.apiStatus
  );

  useEffect(() => {
    dispatch(fetchAllGenres);
  }, []);

  if (
    genresFetchingApiStatus === ApiStatus.init ||
    genresFetchingApiStatus === ApiStatus.pending
  ) {
    return <Spin />;
  }

  if (genresFetchingApiStatus === ApiStatus.success) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="genres/:genreId" Component={Home} />
          <Route path="*" Component={NotFound} />
        </Routes>
      </BrowserRouter>
    );
  }

  return <h1>Something went wrong ! unable to fetch table of contents</h1>;
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
