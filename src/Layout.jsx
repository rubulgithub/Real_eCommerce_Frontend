import React from "react";
// import Navbar from "./components/Header/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="sm:flex flex-none">
        <div className="sm:flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
