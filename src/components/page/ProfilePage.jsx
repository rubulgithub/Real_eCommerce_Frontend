import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button.jsx";
import {
  ChevronRight,
  ShoppingBag,
  User,
  CreditCard,
  Package,
  LogOut,
} from "lucide-react";
import {
  getUserProfile,
  updateUserProfile,
} from "../../store/Slices/ProfileSlice.js";

export default function ProfileDesign() {
  const dispatch = useDispatch();
  const { UserProfile, isLoading } = useSelector((state) => state.profile);
  console.log("User Profile", UserProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    countryCode: "",
  });

  // Fetch profile data on component mount
  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  // Update form data when profile data is fetched
  useEffect(() => {
    if (UserProfile) {
      setFormData({
        firstName: UserProfile.firstName || "",
        lastName: UserProfile.lastName || "",
        phoneNumber: UserProfile.phoneNumber || "",
        countryCode: UserProfile.countryCode || "",
      });
    }
  }, [UserProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    await dispatch(updateUserProfile(formData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data to original profile data
    if (UserProfile) {
      setFormData({
        firstName: UserProfile.firstName || "",
        lastName: UserProfile.lastName || "",
        phoneNumber: UserProfile.phoneNumber || "",
        countryCode: UserProfile.countryCode || "",
      });
    }
    setIsEditing(false);
  };

  const renderField = (label, name, value) => {
    return (
      <div className="flex justify-between items-center border-b pb-4">
        <div className="text-gray-600">{label}</div>
        {isEditing ? (
          <input
            type="text"
            name={name}
            value={value}
            onChange={handleInputChange}
            className="text-gray-900 border rounded px-2 py-1 focus:outline-none focus:border-blue-500"
          />
        ) : (
          <div className="text-gray-900">{value}</div>
        )}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100 p-8">
      {/* Sidebar */}
      <div className="w-64 bg-white rounded-lg shadow-sm h-fit">
        <div className="p-4">
          {/* Profile Header */}
          <div className="flex items-center space-x-3 mb-8 p-2">
            <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
            <div>
              <div className="text-sm text-gray-500">Hello,</div>
              <div className="font-medium">
                {formData.firstName} {formData.lastName}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {/* Orders Section */}
            <div className="flex items-center justify-between p-2 text-gray-700 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">MY ORDERS</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </div>

            {/* Account Settings Section */}
            <div className="flex items-center justify-between p-2 bg-blue-50 text-blue-600 cursor-pointer">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">ACCOUNT SETTINGS</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </div>
            <div className="pl-9 p-2 text-blue-600 text-sm">
              Profile Information
            </div>
            <div className="pl-9 p-2 text-gray-600 hover:bg-gray-50 text-sm">
              Manage Addresses
            </div>
            <div className="pl-9 p-2 text-gray-600 hover:bg-gray-50 text-sm">
              PAN Card Information
            </div>

            {/* Payments Section */}
            <div className="flex items-center justify-between p-2 text-gray-700 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">PAYMENTS</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </div>
            <div className="flex items-center justify-between pl-9 p-2 text-gray-600 hover:bg-gray-50 text-sm">
              <span>Gift Cards</span>
              <span>₹0</span>
            </div>
            <div className="pl-9 p-2 text-gray-600 hover:bg-gray-50 text-sm">
              Saved UPI
            </div>
            <div className="pl-9 p-2 text-gray-600 hover:bg-gray-50 text-sm">
              Saved Cards
            </div>

            {/* My Stuff Section */}
            <div className="flex items-center justify-between p-2 text-gray-700 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center">
                <Package className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">MY STUFF</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </div>
            <div className="pl-9 p-2 text-gray-600 hover:bg-gray-50 text-sm">
              My Coupons
            </div>
            <div className="pl-9 p-2 text-gray-600 hover:bg-gray-50 text-sm">
              My Reviews & Ratings
            </div>
            <div className="pl-9 p-2 text-gray-600 hover:bg-gray-50 text-sm">
              All Notifications
            </div>
            <div className="pl-9 p-2 text-gray-600 hover:bg-gray-50 text-sm">
              My Wishlist
            </div>
          </nav>

          {/* Logout Section */}
          <div className="mt-8 pt-4 border-t">
            <div className="flex items-center p-2 text-gray-700 hover:bg-gray-50 cursor-pointer">
              <LogOut className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Logout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-center mb-6">
            Profile Details
          </h2>

          {/* Profile Fields */}
          <div className="space-y-4">
            {renderField("First Name", "firstName", formData.firstName)}
            {renderField("Last Name", "lastName", formData.lastName)}
            {renderField("Mobile Number", "phoneNumber", formData.phoneNumber)}
            {renderField("Country Code", "countryCode", formData.countryCode)}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8">
            {isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex-1 bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition-colors uppercase font-medium"
                >
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  onClick={handleCancel}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-md hover:bg-gray-600 transition-colors uppercase font-medium"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="w-full mt-8 bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600 transition-colors uppercase font-medium"
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
