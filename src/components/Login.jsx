import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { Link } from "react-router-dom";
import GoogleSSOButton from "./GoogleSSOButton";

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {};
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-green-400 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
        {/* Left Section - Promotional Content */}
        <div className="text-white space-y-8 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            SIGN IN TO USE
          </h1>

          <div className="relative max-w-md mx-auto md:mx-0">
            <div className="bg-white rounded-2xl p-8 text-center transform rotate-2 shadow-xl">
              <div className="text-gray-800">
                <h2 className="text-xl mb-4">YOU HAVE RECEIVED</h2>
                <h3 className="text-2xl font-bold mb-2">A NEW USER GIFT!</h3>

                <div className="text-6xl font-bold text-blue-600 my-6 flex items-center justify-center">
                  ₹<span className="text-8xl">500</span>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <p className="text-blue-600 font-semibold">FREE SHIPPING</p>
                  <p className="text-sm text-gray-600">ON FIRST ORDER</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4 mt-6">
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                100% Authentic
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                Free Shipping
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                Free Return
              </span>
            </div>
          </div>
        </div>

        {/* Right Section - Sign In Form */}
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            SIGN IN TO SHOP GREAT DEALS
          </h2>

          <form onSubmit={handleSignIn} className="space-y-4">
            <Input
              label="Email or username"
              placeholder="Enter your email or Username"
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type="submit" bgColor="bg-blue-600" textColor="text-white">
              SIGN UP
            </Button>

            <div className="text-center">
              <Link
                to={"/signup"}
                className="block w-full text-center py-2 px-4 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-[#1CD5C5] bg-white hover:bg-gray-50 "
              >
                Create an account
              </Link>
            </div>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <GoogleSSOButton />
          </div>

          <p className="text-xs text-gray-600 text-center mt-6">
            By signing up, you agree to RiverMart's{" "}
            <a href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            &{" "}
            <a href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
