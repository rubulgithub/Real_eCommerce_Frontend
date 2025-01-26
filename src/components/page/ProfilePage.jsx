import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  updateUserProfile,
  resetProfileStatus,
} from "../../store/Slices/ProfileSlice";
import {
  ChevronRight,
  ShoppingBag,
  User,
  CreditCard,
  Package,
  LogOut,
} from "lucide-react";
import Button from "../Button.jsx";
import Loader from "../Loader.jsx";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    countryCode: "",
    phoneNumber: "",
  });

  const { UserProfile, isLoading, isProfileUpdated, profileUpdateError } =
    useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (UserProfile) {
      setFormData({
        firstName: UserProfile.firstName || "",
        lastName: UserProfile.lastName || "",
        countryCode: UserProfile.countryCode || "",
        phoneNumber: UserProfile.phoneNumber || "",
      });
    }
  }, [UserProfile]);

  useEffect(() => {
    if (isProfileUpdated) {
      toast.success("You have successfully updated your profile");
      dispatch(resetProfileStatus());
      setIsEditing(false);
    }

    if (profileUpdateError) {
      toast.error("Failed to update profile");
      dispatch(resetProfileStatus());
    }
  }, [isProfileUpdated, profileUpdateError, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
  };

  return (
    <div className="flex min-h-screen mr-28 ml-28 bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm">
        <div className="p-4">
          <div className="flex items-center space-x-3 mb-8">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Cl7IjnF6G3B6utk8wkGYy4deIgSzAJ.png"
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <div className="text-sm text-gray-500">Hello,</div>
              <div className="font-medium">
                {UserProfile?.firstName + " " + UserProfile?.lastName ||
                  "Guest"}
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            <NavItem icon={ShoppingBag} text="MY ORDERS" />
            <NavItem icon={User} text="ACCOUNT SETTINGS" active />
            <SubNavItem text="Profile Information" active />
            <SubNavItem text="Manage Addresses" />
            <SubNavItem text="PAN Card Information" />
            <NavItem icon={CreditCard} text="PAYMENTS" />
            <SubNavItem text="Gift Cards" suffix="₹0" />
            <SubNavItem text="Saved UPI" />
            <SubNavItem text="Saved Cards" />
            <NavItem icon={Package} text="MY STUFF" />
            <SubNavItem text="My Coupons" />
            <SubNavItem text="My Reviews & Ratings" />
            <SubNavItem text="All Notifications" />
            <SubNavItem text="My Wishlist" />
          </nav>

          <div className="mt-8 pt-4 border-t">
            <NavItem icon={LogOut} text="Logout" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {isLoading ? (
          <Loader>Your Profile...</Loader>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-center mb-6">
              Profile Details
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {isEditing ? (
                  <>
                    <EditableProfileDetail
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    <EditableProfileDetail
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                    <EditableProfileDetail
                      label="Country Code"
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                    />
                    <EditableProfileDetail
                      label="Mobile Number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </>
                ) : (
                  <>
                    <ProfileDetail
                      label="First Name"
                      value={UserProfile?.firstName || "- not added -"}
                    />
                    <ProfileDetail
                      label="Last Name"
                      value={UserProfile?.lastName || "- not added -"}
                    />
                    <ProfileDetail
                      label="Mobile Number"
                      value={UserProfile?.phoneNumber || "- not added -"}
                    />
                    <ProfileDetail
                      label="Country Code"
                      value={UserProfile?.countryCode || "- not added -"}
                    />
                  </>
                )}
              </div>

              <Button
                type={isEditing ? "submit" : "button"}
                className="w-full mt-8 bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600 transition-colors uppercase font-medium"
                onClick={isEditing ? undefined : handleEditToggle}
              >
                {isEditing ? "Save" : "Edit"}
              </Button>
              {isEditing && (
                <Button
                  type="button"
                  className="w-full mt-4 bg-gray-200 text-gray-700 py-3 rounded-md hover:bg-gray-300 transition-colors uppercase font-medium"
                  onClick={handleEditToggle}
                >
                  Cancel
                </Button>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

function NavItem({
  icon: Icon,
  text,
  active = false,
  suffix,
  onClick,
  className = "",
}) {
  return (
    <div
      className={`
        flex items-center justify-between p-2 rounded-md cursor-pointer
        ${
          active ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
        }
        ${className}
      `}
      onClick={onClick}
    >
      <div className="flex items-center">
        {Icon && <Icon className="w-5 h-5 mr-2" />}
        <span className="text-sm font-medium">{text}</span>
      </div>
      {suffix ? (
        <span className="text-sm text-gray-600">{suffix}</span>
      ) : (
        <ChevronRight className="w-4 h-4" />
      )}
    </div>
  );
}

function SubNavItem({ text, active, suffix }) {
  return (
    <div
      className={`flex items-center justify-between pl-9 p-2 ${
        active ? "text-blue-600" : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <span className="text-sm">{text}</span>
      {suffix && <span className="text-sm">{suffix}</span>}
    </div>
  );
}

function ProfileDetail({ label, value }) {
  return (
    <div className="flex justify-between items-center border-b pb-4">
      <div className="text-gray-600">{label}</div>
      <div className="text-gray-900">{value}</div>
    </div>
  );
}

function EditableProfileDetail({ label, name, value, onChange }) {
  return (
    <div className="flex justify-between items-center border-b pb-4">
      <div className="text-gray-600">{label}</div>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="text-gray-900 border rounded px-2 py-1"
      />
    </div>
  );
}
