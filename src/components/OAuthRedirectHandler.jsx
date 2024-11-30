import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OAuthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect user to the dashboard on successful login
    toast.success("Successfully authenticated with Google");
    navigate("/");
  }, [navigate]);

  return <div>Loading...</div>;
};

export default OAuthRedirectHandler;
