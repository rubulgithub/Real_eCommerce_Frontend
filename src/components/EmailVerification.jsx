// EmailVerification.js
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { verifyEmail } from "../store/Slices/AuthSlice"; // Import the verifyEmail action
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EmailVerification = () => {
  const dispatch = useDispatch();
  const { token } = useParams();

  useEffect(() => {
    const verifyUserEmail = async () => {
      try {
        await dispatch(verifyEmail(token));
        toast.success("Email verified successfully!");
      } catch (error) {
        toast.error("Email verification failed. Please try again.");
      }
    };

    if (token) {
      verifyUserEmail();
    }
  }, [dispatch, token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-bold">Verifying your email...</h2>
      </div>
    </div>
  );
};

export default EmailVerification;
