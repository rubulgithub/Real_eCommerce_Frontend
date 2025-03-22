import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../helpers/Api.js";

const OAuthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        toast.success("Successfully authenticated with Google");
        navigate("/");
      } catch (error) {
        console.error("Error fetching user:", error);
        if (error.response.status === 401) {
          // Redirect to login page if unauthorized
          navigate("/login");
        }
      }
    };

    fetchUser();
  }, [navigate]);

  return <div>Loading...</div>;
};

export default OAuthRedirectHandler;
