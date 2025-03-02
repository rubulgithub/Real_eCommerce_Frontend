// App.jsx
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
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="w-full px-4 md:px-6 lg:px-8">
          <AppRoute />
        </div>
      </main>
      <ToastContainer {...toastConfig} />
    </div>
  );
});

export default App;
