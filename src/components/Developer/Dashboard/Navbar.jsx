import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiHome,
  FiDollarSign,
  FiArrowUpRight,
  FiList,
  FiFileText,
  FiLogOut,
  FiMenu,
  FiX
} from "react-icons/fi";

const Navbar = (props) => {
  const [activeNav, setActiveNav] = useState(props.location);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white border-b border-gray-100">
        <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
          Dev Profile
        </h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-gray-600"
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </div>

      {/* Responsive Sidebar */}
      <nav
        className={`fixed md:relative md:translate-x-0 inset-y-0 left-0 w-72 bg-white/80 backdrop-blur-lg border-r border-gray-100 p-6 shadow-xl transform transition-transform duration-300 z-20
              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            Dev Profile
          </h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden p-2 text-gray-600"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col justify-between md:h-[84%] h-[80%]">
          <ul className="space-y-2">
            {[
              { name: "Dashboard", navigate: "/dashboard" },
              { name: "Balance", navigate: "/dashboard/balance" },
              { name: "Transfer", navigate: "/dashboard/transfer" },
              { name: "Transactions", navigate: "/dashboard/transactions" },
              { name: "Invoice", navigate: "/dashboard/invoice" },
            ].map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setActiveNav(item.name);
                    setIsSidebarOpen(false);
                    navigate(item.navigate);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all cursor-pointer ${
                    activeNav === item.name
                      ? "bg-gradient-to-r from-red-50 to-red-50 border border-red-100 text-red-600 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50/60 border border-transparent"
                  }`}
                >
                  {item.name === "Dashboard" && <FiHome className="w-5 h-5" />}
                  {item.name === "Balance" && (
                    <FiDollarSign className="w-5 h-5" />
                  )}
                  {item.name === "Transfer" && (
                    <FiArrowUpRight className="w-5 h-5" />
                  )}
                  {item.name === "Transactions" && (
                    <FiList className="w-5 h-5" />
                  )}
                  {item.name === "Invoice" && (
                    <FiFileText className="w-5 h-5" />
                  )}
                  <span className="font-medium text-sm">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="px-2">
          <button
            // onClick={handleLogout}
            className="flex items-center gap-2 text-white hover:bg-[#c1000f] bg-[#fe121a] px-8 rounded-md shadow-2xl py-4 transition-colors cursor-pointer"
            onClick={logout}
          >
            <FiLogOut className="w-5 h-5 font-semibold" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </nav>
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 md:hidden z-10"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
