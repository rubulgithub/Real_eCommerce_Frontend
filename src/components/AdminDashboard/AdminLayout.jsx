import { Outlet, Link, useNavigate } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Main Content Area - takes remaining height */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - scrollable if needed */}
        <aside className="w-64 bg-white shadow-lg overflow-y-auto">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          </div>
          <nav className="mt-4">
            <Link
              to="/admin/users"
              className="block p-3 hover:bg-gray-100 text-gray-700"
            >
              Users
            </Link>
            <Link
              to="/admin/products"
              className="block p-3 hover:bg-gray-100 text-gray-700"
            >
              Products
            </Link>
            <Link
              to="/admin/orders"
              className="block p-3 hover:bg-gray-100 text-gray-700"
            >
              Orders
            </Link>
            <Link
              to="/admin/analytics"
              className="block p-3 hover:bg-gray-100 text-gray-700"
            >
              Analytics
            </Link>
          </nav>
        </aside>

        {/* Main Content - scrollable if needed */}
        <main className="flex-1 bg-gray-100 overflow-y-auto">
          <div className="max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8 py-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer - fixed height */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <div className="max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8">
          <p className="text-sm">
            &copy; 2025 Your Admin Panel. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
