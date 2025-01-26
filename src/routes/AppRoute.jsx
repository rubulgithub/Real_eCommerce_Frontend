import { Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";

// Lazy load components
const Layout = lazy(() => import("../Layout.jsx"));
import Loader from "../components/Loader";
const AuthLayout = lazy(() => import("../components/AuthLayout"));
const Home = lazy(() => import("../components/page/Home"));
const SignUp = lazy(() => import("../components/SignUp"));
const Login = lazy(() => import("../components/Login"));
const EmailVerification = lazy(() => import("../components/EmailVerification"));
const OAuthRedirectHandler = lazy(() =>
  import("../components/OAuthRedirectHandler")
);
const PrivateRoute = lazy(() => import("../components/PrivateRoute"));
const GoogleSSOFailure = lazy(() => import("../components/GoogleSSOFailure"));
const ProfilePage = lazy(() => import("../components/page/ProfilePage"));

// Route configurationsload
const ROUTES = {
  HOME: "/",
  SIGNUP: "/signup",
  LOGIN: "/login",
  VERIFY_EMAIL: "/verify-email/:token",
  PROFILE: "/profile",
  FAILURE: "/failure",
  PRIVATE: "/private",
  PROFILE_PAGE: "/profile-page",
};

const AppRoute = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route path={ROUTES.HOME} element={<Layout />}>
        <Route
          index
          element={
            <AuthLayout authentication={false}>
              <Home />
            </AuthLayout>
          }
        />
      </Route>
      <Route
        path={ROUTES.SIGNUP}
        element={
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        }
      />
      <Route
        path={ROUTES.VERIFY_EMAIL}
        element={
          <AuthLayout authentication={false}>
            <EmailVerification />
          </AuthLayout>
        }
      />
      <Route
        path={ROUTES.LOGIN}
        element={
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        }
      />
      <Route
        path={ROUTES.PROFILE}
        element={
          <AuthLayout authentication>
            <OAuthRedirectHandler />
          </AuthLayout>
        }
      />
      <Route
        path={ROUTES.FAILURE}
        element={
          <AuthLayout authentication={false}>
            <GoogleSSOFailure />
          </AuthLayout>
        }
      />
      <Route
        path={ROUTES.PRIVATE}
        element={
          <AuthLayout authentication>
            <PrivateRoute />
          </AuthLayout>
        }
      />
      <Route
        path={ROUTES.PROFILE_PAGE}
        element={
          <AuthLayout authentication>
            <ProfilePage />
          </AuthLayout>
        }
      />
    </Routes>
  </Suspense>
);

export default AppRoute;
