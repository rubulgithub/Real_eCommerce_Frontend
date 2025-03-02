import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Search as SearchIcon } from "lucide-react";
import { useSelector } from "react-redux";
import ProfileMenu from "../ProfileMenu";
import Navigation from "./Navigation.jsx";

export default function Navbar() {
  const authStatus = useSelector((state) => state.auth.status);
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/signup" || location.pathname === "/login";

  return (
    <header className="w-full">
      {/* Top banner */}
      <div className="w-full bg-black text-white text-center py-1 xs:py-1.5 text-xs xs:text-sm">
        Free Shipping For New Users & Free Returns*
      </div>

      {/* Secondary header */}
      <div className="border-b bg-white px-2 xs:px-4">
        <div className="container flex justify-between items-center h-8 xs:h-10">
          <div className="flex gap-2 xs:gap-4">
            <Link
              to="/about"
              className="text-xs xs:text-sm hover:text-pink-500"
            >
              ABOUT US
            </Link>
          </div>
          <div className="flex items-center gap-2 xs:gap-4">
            {authStatus ? (
              <div className="text-xs xs:text-sm hover:text-pink-500 cursor-pointer">
                <ProfileMenu />
              </div>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="text-xs xs:text-sm hover:text-pink-500"
                >
                  SIGN UP
                </Link>
                <Link
                  to="/login"
                  className="text-xs xs:text-sm hover:text-pink-500"
                >
                  LOGIN
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b bg-white px-2 xs:px-4">
        <div className="container py-2 xs:py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Badges Container */}
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-pink-600 text-xl xs:text-2xl md:text-3xl font-bold whitespace-nowrap"
              >
                VIPSHOP
              </Link>

              {/* Authenticity Badges - Hidden on mobile */}
              {!isAuthPage && (
                <div className="hidden md:flex items-center gap-4">
                  {["100% Authentic", "Free Shipping", "Free Return"].map(
                    (text) => (
                      <div
                        key={text}
                        className="flex items-center gap-1 text-xs lg:text-sm"
                      >
                        <div className="w-3 h-3 rounded-full border-2 border-pink-500 flex items-center justify-center">
                          ✓
                        </div>
                        <span>{text}</span>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Search and Cart - Only on non-auth pages */}
            {!isAuthPage && (
              <div className="flex items-center gap-2 xs:gap-4 w-full max-w-[600px] justify-end">
                <div className="relative w-full max-w-[400px]">
                  <input
                    type="search"
                    placeholder="Search"
                    className="w-full pl-3 pr-10 py-1.5 rounded border border-gray-200 focus:outline-none focus:border-pink-500 text-xs xs:text-sm"
                  />
                  <button className="absolute right-0 top-0 h-full px-3 xs:px-4 bg-pink-600 text-white">
                    <SearchIcon className="h-4 w-4 xs:h-5 xs:w-5" />
                  </button>
                </div>
                <Link
                  to="/cart"
                  className="flex-shrink-0 flex items-center text-gray-700 hover:text-pink-600 text-xs xs:text-sm"
                >
                  <ShoppingCart className="h-5 w-5 xs:h-6 xs:w-6" />
                  <span className="hidden xs:inline ml-1">Cart</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation */}
      {!isAuthPage && <Navigation />}

      {/* Decorative border */}
      <div className="w-full h-2 bg-[url('/checkered-border.png')] bg-repeat-x"></div>
    </header>
  );
}
