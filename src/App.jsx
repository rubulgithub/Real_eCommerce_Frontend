import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbar from "./components/Header/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <div className="sm:flex flex-none">
        <div className="sm:flex-1">
          <Outlet />
        </div>
      </div>
      <ToastContainer
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
