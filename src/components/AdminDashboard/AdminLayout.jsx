import { Outlet, Link, useLocation, Navigate } from "react-router-dom";
import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import ErrorBoundary from "../../helpers/ErrorBoundary"; // Add an error boundary component

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Function to check if a path is active
  const isActive = (path) => location.pathname.startsWith(path);

  // Redirect to /admin/users if the current path is /admin
  if (location.pathname === "/admin") {
    return <Navigate to="/admin/users" replace />;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Mobile Header with Menu Button */}
      <div className="md:hidden bg-white shadow-sm border-b px-4 py-3 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-600 hover:bg-gray-100"
        >
          {sidebarOpen ? (
            <XIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="md:hidden fixed inset-0 z-10 bg-black bg-opacity-50"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Responsive Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:relative z-20 h-full md:h-auto w-3/4 sm:w-64 bg-white shadow-lg overflow-y-auto transition-transform duration-300 ease-in-out`}
        >
          <div className="p-4 border-b hidden md:block">
            <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          </div>
          <nav className="mt-4">
            <Link
              to="/admin/users"
              className={`block p-3 hover:bg-gray-100 ${
                isActive("/admin/users")
                  ? "bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-700"
                  : "text-gray-700"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              Users
            </Link>
            <Link
              to="/admin/products"
              className={`block p-3 hover:bg-gray-100 ${
                isActive("/admin/products")
                  ? "bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-700"
                  : "text-gray-700"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/admin/orders"
              className={`block p-3 hover:bg-gray-100 ${
                isActive("/admin/orders")
                  ? "bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-700"
                  : "text-gray-700"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              Orders
            </Link>
            <Link
              to="/admin/analytics"
              className={`block p-3 hover:bg-gray-100 ${
                isActive("/admin/analytics")
                  ? "bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-700"
                  : "text-gray-700"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              Analytics
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 overflow-y-auto">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
            <ErrorBoundary>
              <Outlet />
            </ErrorBoundary>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-3 sm:py-4 text-center">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs sm:text-sm">
            &copy; 2025 Your Admin Panel. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
