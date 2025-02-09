import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogout } from "../store/Slices/AuthSlice";
import {
  FileText,
  Heart,
  User,
  MapPin,
  Ticket,
  MessageCircle,
  Gift,
  LogOut,
} from "lucide-react";

const ProfileMenu = () => {
  const avatar = useSelector((state) => state.auth.user.avatar);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const logout = async () => {
    await dispatch(userLogout());
    navigate("/");
  };

  const menuItems = [
    { icon: FileText, text: "My Orders", path: "/orders" },
    { icon: Heart, text: "My Likes", path: "/likes" },
    { icon: User, text: "My Profile", path: "/profile" },
    { icon: MapPin, text: "My Address", path: "/address" },
    { icon: Ticket, text: "My Vouchers", path: "/vouchers" },
    { icon: MessageCircle, text: "Customer Care", path: "/customer-care" },
    { icon: Gift, text: "VIP Affiliate Club", path: "/vip-affiliate" },
  ];

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  return (
    <div className="relative" onMouseEnter={handleMouseEnter} ref={menuRef}>
      <img
        src={avatar}
        className="z-10 w-10 h-10 rounded-full cursor-pointer"
        onClick={toggleMenu}
      />

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20">
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
