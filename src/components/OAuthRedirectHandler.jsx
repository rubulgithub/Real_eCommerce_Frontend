import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { revalidateUser } from "../path/to/AuthSlice"; // Adjust the path

const OAuthRedirectHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const revalidateAndRedirect = async () => {
      try {
        // Dispatch the `revalidateUser` action to check the user's authentication status
        const resultAction = await dispatch(revalidateUser());

        // Check if the action was successful
        if (revalidateUser.fulfilled.match(resultAction)) {
          const user = resultAction.payload;
          console.log("User data:", user);

          // Show a success toast
          toast.success("Successfully authenticated with Google");

          // Redirect to the profile page
          navigate("/profile");
        } else {
          // Handle the case where the action was rejected
          toast.error("Failed to revalidate user");
          navigate("/login");
        }
      } catch (error) {
        // Redirect to the login page
        navigate("/login");
      }
    };

    revalidateAndRedirect();
  }, [dispatch, navigate]);

  return <div>Loading...</div>;
};

export default OAuthRedirectHandler;
