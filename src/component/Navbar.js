import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./form/Authprovider";

const Navbar = () => {
  const navigate = useNavigate();
  const { login, logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
    toast.success("Successfully logged out!");
  };

  return (
    <header className="bg-white shadow-lg fixed top-0 left-0 w-full z-30">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">Inventory Order Management System</h2>
        <nav>
          <ul className="flex space-x-6">
            {user && user.role === "admin" && (
              <>
                <li>
                  <Link
                    to="/AdminDashboard"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/inventoryform"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Inventory Form
                  </Link>
                </li>
              </>
            )}

            {user && user.role === "custmore" && (
              <>
                <li>
                  <Link
                    to="/customerDashboard"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Customer Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Cart
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orderadmin"
                    className="text-gray-700 hover:text-gray-900"
                  >
                    Orderadmin
                  </Link>
                </li>
              </>
            )}

            {!login ? (
              <li>
                <Link to="/login" className="text-gray-700 hover:text-gray-900">
                  Login
                </Link>
              </li>
            ) : (
              <li>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
