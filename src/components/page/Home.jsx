import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const goToPrivateRoute = () => {
    navigate("/private");
  };

  return (
    <div>
      <h1>Home</h1>
      <button onClick={goToPrivateRoute}>Go to Private Route</button>
    </div>
  );
};

export default Home;
