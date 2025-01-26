import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { revalidateUser } from "./store/Slices/AuthSlice";
import Navbar from "./components/Header/Navbar";
import AppRoute from "./routes/AppRoute.jsx";
import { toastConfig } from "./helpers/toastConfig.jsx";

const App = React.memo(() => {
  const dispatch = useDispatch();

  const initializeUser = useCallback(() => {
    dispatch(revalidateUser());
  }, [dispatch]);

  useEffect(() => {
    initializeUser();
  }, [initializeUser]);

  return (
    <>
      <Navbar />
      <AppRoute />
      <ToastContainer {...toastConfig} />
    </>
  );
});

export default App;
