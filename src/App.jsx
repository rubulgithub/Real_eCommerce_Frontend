import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { revalidateUser } from "./store/Slices/AuthSlice";
import Layout from "./Layout";
import Home from "./components/page/Home";
import SignUp from "./components/SignUp";
import EmailVerification from "./components/EmailVerification";
import GoogleSSOFailure from "./components/GoogleSSOFailure.jsx";
import Login from "./components/Login";
import OAuthRedirectHandler from "./components/OAuthRedirectHandler";
import PrivateRoute from "./components/PrivateRoute";
import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/AuthLayout.jsx";
import Navbar from "./components/Header/Navbar.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(revalidateUser());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path=""
            element={
              <AuthLayout authentication={false}>
                <Home />
              </AuthLayout>
            }
          />
        </Route>
        <Route
          path="/signup"
          element={
            <AuthLayout authentication={false}>
              <SignUp />
            </AuthLayout>
          }
        />
        <Route
          path="/verify-email/:token"
          element={
            <AuthLayout authentication={false}>
              <EmailVerification />
            </AuthLayout>
          }
        />
        <Route
          path="/login"
          element={
            <AuthLayout authentication={false}>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <AuthLayout authentication>
              <OAuthRedirectHandler />
            </AuthLayout>
          }
        />
        <Route
          path="/failure"
          element={
            <AuthLayout authentication={false}>
              <GoogleSSOFailure />
            </AuthLayout>
          }
        />
        <Route
          path="/private"
          element={
            <AuthLayout authentication>
              <PrivateRoute />
            </AuthLayout>
          }
        />
      </Routes>
      <ToastContainer
        className="fixed top-4 mr-60"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
