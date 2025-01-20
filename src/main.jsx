import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/Store.js";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
import EmailVerification from "./components/EmailVerification.jsx";
import Home from "./components/page/Home.jsx";
import OAuthRedirectHandler from "./components/OAuthRedirectHandler.jsx";
import GoogleSSOFailure from "./components/GoogleSSOFailure.jsx";
import AuthLayout from "./components/AuthLayout.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/verify-email/:token",
        element: <EmailVerification />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <OAuthRedirectHandler />,
      },
      {
        path: "/failure",
        element: <GoogleSSOFailure />,
      },
      {
        path: "/private",
        element: (
          <AuthLayout authentication={true}>
            <PrivateRoute />
          </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
