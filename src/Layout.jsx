// Layout.jsx
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-full max-w-[2000px] mx-auto">
      <Outlet />
    </div>
  );
};

export default Layout;
