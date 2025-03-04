import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../store/Slices/AuthSlice";
import {
  User,
  FileText,
  Heart,
  MapPin,
  Ticket,
  MessageCircle,
  Gift,
  LogOut,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
} from "lucide-react";

const ProfileMenu = () => {
  const user = useSelector((state) => state.auth.user);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, [handleClickOutside]);

  const logout = async () => {
    await dispatch(userLogout());
    navigate("/");
  };

  const menuItems = [
    { icon: User, text: "My Profile", path: "/profile-page" },
    ...(user?.role === "ADMIN"
      ? [{ icon: LayoutDashboard, text: "Dashboard", path: "/admin" }]
      : []),
    { icon: FileText, text: "My Orders", path: "/orders" },
    { icon: Heart, text: "My Likes", path: "/likes" },
    { icon: MapPin, text: "My Address", path: "/address" },
    { icon: Ticket, text: "My Vouchers", path: "/vouchers" },
    { icon: MessageCircle, text: "Customer Care", path: "/customer-care" },
    { icon: Gift, text: "VIP Affiliate Club", path: "/vip-affiliate" },
  ];

  return (
    <div
      className="relative z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={menuRef}
    >
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-all duration-200 hover:bg-gray-100"
        onClick={toggleMenu}
      >
        <User className="w-4 h-4 text-gray-600" />
        {/* <span className="font-medium text-gray-900">{user.username}</span> */}
        {isHovered ? (
          <ChevronUp className="w-4 h-4 text-gray-600" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-600" />
        )}
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex items-center px-4 py-3 text-sm"
                role="menuitem"
              >
                <item.icon className="mr-3 h-5 w-5" aria-hidden="true" />
                {item.text}
              </Link>
            ))}

            <button
              onClick={logout}
              className="text-red-600 hover:text-red-700 flex items-center px-4 py-3 text-sm w-full text-left"
              role="menuitem"
            >
              <LogOut className="mr-3 h-5 w-5" aria-hidden="true" />
              Log Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
