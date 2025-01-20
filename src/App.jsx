import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Navbar from "./components/Header/Navbar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "./store/Slices/AuthSlice";

function App() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  console.log("status", authStatus);

  useEffect(() => {
    console.log("Dispatching currentUser...");
    dispatch(currentUser());
  }, [dispatch]);

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
