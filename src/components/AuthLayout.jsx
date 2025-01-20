import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authentication }) {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  console.log("one");
  console.log("auth from Authlayout", authStatus);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
  }, [authStatus, authentication, navigate]);

  return children;
}

export default AuthLayout;
