import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OAuthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the profile page
    toast.success("Successfully authenticated with Google");
    navigate("/profile-page");
  }, [navigate]);

  return <div>Loading...</div>;
};

export default OAuthRedirectHandler;
