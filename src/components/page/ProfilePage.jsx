import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronRight,
  ShoppingBag,
  User,
  CreditCard,
  Package,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Edit2,
  Save,
  Phone,
  Globe,
  Mail,
  Check,
} from "lucide-react";
import {
  getUserProfile,
  updateUserProfile,
} from "../../store/Slices/ProfileSlice.js";

export default function ProfileDesign() {
  const dispatch = useDispatch();
  const { UserProfile, isLoading } = useSelector((state) => state.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSections, setActiveSections] = useState({
    account: true,
    payments: false,
    myStuff: false,
  });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    countryCode: "",
    email: "",
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
        email: UserProfile.email || "",
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
    if (UserProfile) {
      setFormData({
        firstName: UserProfile.firstName || "",
        lastName: UserProfile.lastName || "",
        phoneNumber: UserProfile.phoneNumber || "",
        countryCode: UserProfile.countryCode || "",
        email: UserProfile.email || "",
      });
    }
    setIsEditing(false);
  };

  const toggleSection = (section) => {
    setActiveSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        isSidebarOpen &&
        !e.target.closest(".sidebar-content") &&
        !e.target.closest(".sidebar-toggle")
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isSidebarOpen]);

  const renderField = (label, name, value, icon) => {
    return (
      <div className="border-b border-gray-100 py-4 last:border-0">
        <div className="flex items-center mb-2 text-gray-500">
          {icon}
          <span className="ml-2 text-sm font-medium uppercase">{label}</span>
        </div>
        {isEditing ? (
          <input
            type="text"
            name={name}
            value={value}
            onChange={handleInputChange}
            className="w-full text-gray-900 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-1"
          />
        ) : (
          <div className="text-gray-900 font-medium mt-1">
            {value || "Not provided"}
          </div>
        )}
      </div>
    );
  };

  // Section for navigation items
  const SidebarSection = ({ title, icon, isActive, toggleFn, children }) => (
    <div className="mb-1">
      <div
        className={`flex items-center justify-between p-3 cursor-pointer rounded-md ${
          isActive
            ? "bg-blue-50 text-blue-600"
            : "text-gray-700 hover:bg-gray-50"
        }`}
        onClick={toggleFn}
      >
        <div className="flex items-center">
          {icon}
          <span className="text-sm font-medium ml-2">{title}</span>
        </div>
        {isActive ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </div>
      {isActive && <div className="pl-4 mt-1 space-y-1">{children}</div>}
    </div>
  );

  const SidebarItem = ({ label, isActive, balance }) => (
    <div
      className={`p-2 text-sm rounded-md flex justify-between items-center ${
        isActive ? "text-blue-600 bg-blue-50" : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <span>{label}</span>
      {balance && <span>{balance}</span>}
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Unified Header */}
      <div className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 lg:hidden rounded-md sidebar-toggle"
            aria-label="Toggle menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white/80 text-xs">Welcome back</div>
              <div className="font-medium">
                {formData.firstName || "User"} {formData.lastName}
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            {isEditing ? (
              <button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-white/20 text-white px-4 py-2 rounded-md hover:bg-white/30 transition-colors"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-white/20 text-white px-4 py-2 rounded-md hover:bg-white/30 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar - Positioned below the header */}
      <div
        className={`lg:hidden bg-white border-t border-b border-gray-200 transition-all duration-300 ${
          isSidebarOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="sidebar-content">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-medium">Menu</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="p-1">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="p-4 overflow-y-auto">
            {/* Navigation */}
            <nav className="space-y-2">
              <SidebarSection
                title="MY ORDERS"
                icon={<ShoppingBag className="w-5 h-5" />}
                isActive={false}
                toggleFn={() => {}}
              />

              <SidebarSection
                title="ACCOUNT SETTINGS"
                icon={<User className="w-5 h-5" />}
                isActive={activeSections.account}
                toggleFn={() => toggleSection("account")}
              >
                <SidebarItem label="Profile Information" isActive={true} />
                <SidebarItem label="Manage Addresses" />
                <SidebarItem label="PAN Card Information" />
              </SidebarSection>

              <SidebarSection
                title="PAYMENTS"
                icon={<CreditCard className="w-5 h-5" />}
                isActive={activeSections.payments}
                toggleFn={() => toggleSection("payments")}
              >
                <SidebarItem label="Gift Cards" balance="₹0" />
                <SidebarItem label="Saved UPI" />
                <SidebarItem label="Saved Cards" />
              </SidebarSection>

              <SidebarSection
                title="MY STUFF"
                icon={<Package className="w-5 h-5" />}
                isActive={activeSections.myStuff}
                toggleFn={() => toggleSection("myStuff")}
              >
                <SidebarItem label="My Coupons" />
                <SidebarItem label="My Reviews & Ratings" />
                <SidebarItem label="All Notifications" />
                <SidebarItem label="My Wishlist" />
              </SidebarSection>
            </nav>

            {/* Logout Section */}
            <div className="mt-8 pt-4 border-t">
              <div className="flex items-center p-3 text-gray-700 hover:bg-gray-50 cursor-pointer rounded-md">
                <LogOut className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-64 bg-white border-r border-gray-100">
              <div className="p-4 overflow-y-auto h-full">
                {/* Profile Summary - Only visible in sidebar */}
                <div className="mb-6 p-4 bg-blue-50 rounded-lg flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <User className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      {formData.firstName || "User"} {formData.lastName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {formData.email}
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  <SidebarSection
                    title="MY ORDERS"
                    icon={<ShoppingBag className="w-5 h-5" />}
                    isActive={false}
                    toggleFn={() => {}}
                  />

                  <SidebarSection
                    title="ACCOUNT SETTINGS"
                    icon={<User className="w-5 h-5" />}
                    isActive={activeSections.account}
                    toggleFn={() => toggleSection("account")}
                  >
                    <SidebarItem label="Profile Information" isActive={true} />
                    <SidebarItem label="Manage Addresses" />
                    <SidebarItem label="PAN Card Information" />
                  </SidebarSection>

                  <SidebarSection
                    title="PAYMENTS"
                    icon={<CreditCard className="w-5 h-5" />}
                    isActive={activeSections.payments}
                    toggleFn={() => toggleSection("payments")}
                  >
                    <SidebarItem label="Gift Cards" balance="₹0" />
                    <SidebarItem label="Saved UPI" />
                    <SidebarItem label="Saved Cards" />
                  </SidebarSection>

                  <SidebarSection
                    title="MY STUFF"
                    icon={<Package className="w-5 h-5" />}
                    isActive={activeSections.myStuff}
                    toggleFn={() => toggleSection("myStuff")}
                  >
                    <SidebarItem label="My Coupons" />
                    <SidebarItem label="My Reviews & Ratings" />
                    <SidebarItem label="All Notifications" />
                    <SidebarItem label="My Wishlist" />
                  </SidebarSection>
                </nav>

                {/* Logout Section */}
                <div className="mt-8 pt-4 border-t">
                  <div className="flex items-center p-3 text-gray-700 hover:bg-gray-50 cursor-pointer rounded-md">
                    <LogOut className="w-5 h-5 mr-2" />
                    <span className="text-sm font-medium">Logout</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content - In same card as sidebar */}
            <div className="flex-1">
              <div className="border-b border-gray-100 p-4 lg:p-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Profile Information
                </h2>
                <p className="text-gray-500 text-sm">
                  Update your personal details
                </p>
              </div>

              <div className="p-4 lg:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    {renderField(
                      "First Name",
                      "firstName",
                      formData.firstName,
                      <User className="w-4 h-4" />
                    )}
                    {renderField(
                      "Last Name",
                      "lastName",
                      formData.lastName,
                      <User className="w-4 h-4" />
                    )}
                    {renderField(
                      "Email",
                      "email",
                      formData.email,
                      <Mail className="w-4 h-4" />
                    )}
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    {renderField(
                      "Mobile Number",
                      "phoneNumber",
                      formData.phoneNumber,
                      <Phone className="w-4 h-4" />
                    )}
                    {renderField(
                      "Country Code",
                      "countryCode",
                      formData.countryCode,
                      <Globe className="w-4 h-4" />
                    )}

                    {/* Profile Status */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center text-gray-500 mb-2">
                        <Check className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium uppercase">
                          Profile Status
                        </span>
                      </div>
                      <div className="flex items-center mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: "80%" }}
                          ></div>
                        </div>
                        <span className="ml-3 text-sm text-gray-600">
                          80% Complete
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Complete your profile to improve account security.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Visible on all screens */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="flex-1 flex justify-center items-center gap-2 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
                      >
                        <Save className="w-4 h-4" />
                        <span>{isLoading ? "Saving..." : "Save Changes"}</span>
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 flex justify-center items-center gap-2 bg-gray-100 text-gray-800 py-3 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Recent Activity Section - Integrated with main content */}
              <div className="border-t border-gray-100 mt-4">
                <div className="p-4 lg:p-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-4">
                    Recent Activity
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <Package className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Order Placed</p>
                        <p className="text-gray-500 text-sm">
                          Order #12345 - 3 items
                        </p>
                        <p className="text-gray-400 text-xs mt-1">2 days ago</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Profile Updated</p>
                        <p className="text-gray-500 text-sm">
                          You updated your phone number
                        </p>
                        <p className="text-gray-400 text-xs mt-1">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
