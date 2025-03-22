import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstance } from "../path/to/axiosInstance";

const OAuthRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("/api/v1/users/current-user");
        console.log("User data:", response.data);
        toast.success("Successfully authenticated with Google");
        navigate("/profile");
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
