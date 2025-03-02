import { Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";

// Lazy load components
const Layout = lazy(() => import("../Layout.jsx"));
import Loader from "../components/Loader.jsx";
import CulturalProductsPage from "../components/page/CulturalProductsPage.jsx";
import { AdminLayout } from "../components/AdminDashboard/AdminLayout.jsx";
import { UsersDashboard } from "../components/AdminDashboard/UsersDashboard.jsx";
const AuthLayout = lazy(() => import("../components/AuthLayout.jsx"));
const Home = lazy(() => import("../components/page/Home.jsx"));
const SignUp = lazy(() => import("../components/SignUp.jsx"));
const Login = lazy(() => import("../components/Login.jsx"));
const EmailVerification = lazy(() =>
  import("../components/EmailVerification.jsx")
);
const OAuthRedirectHandler = lazy(() =>
  import("../components/OAuthRedirectHandler.jsx")
);
const PrivateRoute = lazy(() => import("../components/PrivateRoute.jsx"));
const GoogleSSOFailure = lazy(() =>
  import("../components/GoogleSSOFailure.jsx")
);
const ProfilePage = lazy(() => import("../components/page/ProfilePage.jsx"));

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
  ADMIN: "/admin",
  UserDashboard: "/admin/users",
  CULTURALPRODUCT: "/cultural-products",
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
      <Route
        path={ROUTES.ADMIN}
        element={
          <AuthLayout authentication>
            <AdminLayout />
          </AuthLayout>
        }
      >
        <Route path="users" element={<UsersDashboard />} />
      </Route>

      <Route
        path={ROUTES.CULTURALPRODUCT}
        element={
          <AuthLayout authentication={false}>
            <CulturalProductsPage />
          </AuthLayout>
        }
      />
    </Routes>
  </Suspense>
);

export default AppRoute;
