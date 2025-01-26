import React from "react";
// import Navbar from "./components/Header/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="ml-1 mr-1">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
