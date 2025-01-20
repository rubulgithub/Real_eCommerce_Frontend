import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ChevronRight, ShoppingCart, Search as SearchIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../store/Slices/AuthSlice";

export default function Navbar() {
  const authStatus = useSelector((state) => state.auth.status);
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleItems, setVisibleItems] = useState(5);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  console.log("authStatus Navbar", authStatus);

  const isAuthPage =
    location.pathname === "/signup" || location.pathname === "/login";

  const logout = async () => {
    await dispatch(userLogout());
    navigate("/");
  };

  const navItems = [
    { name: "Women's Clothing", path: "/womens-clothing" },
    { name: "Sports", path: "/sports" },
    { name: "Shoes", path: "/shoes" },
    { name: "Bags", path: "/bags" },
    { name: "Innerwear", path: "/innerwear" },
    { name: "Beauty", path: "/beauty" },
    { name: "Mum & Kids", path: "/mum-kids" },
    { name: "Men's Clothing", path: "/mens-clothing" },
  ];

  useEffect(() => {
    const updateVisibleItems = () => {
      setVisibleItems(window.innerWidth >= 1024 ? 10 : 5);
    };

    updateVisibleItems(); // Initialize on mount
    window.addEventListener("resize", updateVisibleItems);

    return () => window.removeEventListener("resize", updateVisibleItems); // Cleanup
  }, []);

  return (
    <header className="w-full">
      {/* Top banner */}
      <div className="w-full bg-black text-white text-center py-1 sm:py-1.5 text-xs sm:text-sm">
        Free Shipping For New Users & Free Returns*
      </div>

      {/* Secondary header */}
      <div className="border-b bg-white px-4">
        <div className="w-full max-w-screen-xl mx-auto flex justify-between items-center h-6 sm:h-8 md:h-10">
          <div className="flex gap-2 sm:gap-4 md:gap-6">
            <Link
              to="/about"
              className="text-[10px] sm:text-sm hover:text-pink-500"
            >
              ABOUT US
            </Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            {authStatus ? (
              <div
                className="text-[10px] sm:text-sm hover:text-pink-500 cursor-pointer"
                onClick={logout}
              >
                LOGOUT
              </div>
            ) : (
              <>
                <Link
                  to="/signup"
                  className="text-[10px] sm:text-sm hover:text-pink-500"
                >
                  SIGN UP
                </Link>
                <Link
                  to="/login"
                  className="text-[10px] sm:text-sm hover:text-pink-500"
                >
                  LOGIN
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b bg-white px-4">
        <div className="w-full max-w-screen-xl mx-auto py-2 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/"
              className="text-pink-600 text-[19px] sm:text-xl md:text-3xl font-bold whitespace-nowrap"
            >
              VIPSHOP
            </Link>
            {!isAuthPage && (
              <div className="hidden sm:flex items-center gap-6 whitespace-nowrap">
                <div className="flex items-center gap-1 text-[10px] sm:text-xs lg:text-sm">
                  <div className="w-3 h-3 rounded-full border-2 border-pink-500 flex items-center justify-center">
                    ✓
                  </div>
                  <span>100% Authentic</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] sm:text-xs lg:text-sm">
                  <div className="w-3 h-3 rounded-full border-2 border-pink-500 flex items-center justify-center">
                    ✓
                  </div>
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] sm:text-xs lg:text-sm">
                  <div className="w-3 h-3 rounded-full border-2 border-pink-500 flex items-center justify-center">
                    ✓
                  </div>
                  <span>Free Return</span>
                </div>
              </div>
            )}
          </div>
          {!isAuthPage && (
            <div className="flex items-center gap-4">
              <div className="relative w-48 sm:w-80 md:w-96">
                <input
                  type="search"
                  placeholder="Search"
                  className="w-full pl-3 pr-10 py-1.5 rounded-[4px] border border-gray-200 focus:outline-none focus:border-pink-500"
                />
                <button className="absolute right-0 top-0 h-full px-4 bg-pink-600 text-white">
                  <SearchIcon className="h-5 w-5" />
                </button>
              </div>
              <Link
                to="/cart"
                className="relative flex items-center text-gray-700 hover:text-pink-600"
              >
                <ShoppingCart className="h-6 w-6" />
                <span className="ml-1">Cart</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      {!isAuthPage && (
        <nav className="border-b bg-white">
          <div className="w-full max-w-screen-xl mx-auto px-4 flex items-center">
            <ul className="flex flex-wrap items-center gap-2 sm:gap-16 py-1">
              {navItems
                .slice(0, isExpanded ? navItems.length : visibleItems)
                .map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className="text-[13px] sm:text-[16px] font-medium hover:text-pink-500"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              <li>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-sm font-medium flex items-center"
                >
                  <ChevronRight
                    className={`h-4 w-4 transform transition-transform ${
                      isExpanded ? "rotate-90" : "rotate-0"
                    }`}
                  />
                </button>
              </li>
            </ul>
          </div>
        </nav>
      )}

      {/* Decorative border */}
      <div className="w-full h-2 bg-[url('/checkered-border.png')] bg-repeat-x"></div>
    </header>
  );
}
