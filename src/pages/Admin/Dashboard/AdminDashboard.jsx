import { useState, useEffect } from "react";
import {
  FiUsers,
  FiActivity,
  FiPlus,
  FiSearch,
  FiSettings,
  FiLogOut,
  FiEdit,
  FiTrash2,
  FiMenu,
  FiX,
} from "react-icons/fi";
import UserModal from "../../../components/Admin/Dashboard/UserModal";
import { IoLogOut } from "react-icons/io5";
import PageTransition from "../../../PageTransition";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Users");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () =>{
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/admin/users`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUsers(response.data.allUsers); 
      } catch (error) {
        console.error("Error fetching balance:", error);
        toast.error(
          error?.response?.data?.message || "Oops! Something went wrong"
        );
      }
    }
    fetchUser();
  }, [])

  const cancelSubscribe = async (userId)=>{
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/subscriptions/cancel`,
        {
          userId
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("User Subscription cancelled successfully");
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user._id === userId ? { ...user, isSubscribed: false } : user
        )
      );
    } catch (error) {
      console.error("Error fetching balance:", error);
      toast.error(
        error?.response?.data?.message || "Oops! Something went wrong"
      );
    }
  }

  const [logs, setLogs] = useState([]);

useEffect(() => {
  if (activeTab === "Logs") {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/admin/logs`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setLogs(response.data.logs); 
      } catch (error) {
        console.error("Logs fetch error:", error);
        toast.error(
          error?.response?.data?.message || "Unable to fetch logs"
        );
      }
    };
    fetchLogs();
  }
}, [activeTab]);

  const logout = ()=>{
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/login");
  }
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8f8] to-[#fafafa] flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white border-b border-gray-100">
        <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
          Admin
        </h1>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-gray-600"
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </div>

      {/* Responsive Sidebar */}
      <nav
        className={`fixed h-screen md:relative md:translate-x-0 inset-y-0 left-0 w-72 bg-white/80 backdrop-blur-lg border-r border-gray-100 p-6 shadow-xl transform transition-transform duration-300 z-20
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            Admin
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 text-gray-600"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col justify-between md:h-[84%] h-[80%]">
          <ul className="space-y-2">
            {["Users", "Logs"].map((item, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    setActiveTab(item);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all cursor-pointer ${
                    activeTab === item
                      ? "bg-gradient-to-r from-red-50 to-red-50 border border-red-100 text-red-600 shadow-sm"
                      : "text-gray-600 hover:bg-gray-50/60 border border-transparent"
                  }`}
                >
                  {item === "Users" && <FiUsers className="mr-3 text-lg" />}
                  {item === "Logs" && <FiActivity className="mr-3 text-lg" />}

                  <span className="font-medium text-sm">{item}</span>
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

      {/* Main Content */}
      <div className={`flex-1 p-4 md:p-8 max-w-6xl mx-auto`}>
        {/* Enhanced Header */}
        <header className="p-4 md:p-6 bg-white/80 backdrop-blur-sm border-b border-[#e5e7eb]/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sticky top-0 z-10">
          <h2 className="text-xl md:text-2xl font-semibold text-[#111827]">
            {activeTab === "Users" ? "User Management" : "📜 API Logs"}
          </h2>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#fe121a] to-[#ff4d4d] text-white flex items-center justify-center shadow-lg hover:shadow-[#fe121a]/20 transition-shadow">
              <img
                src="https://res.cloudinary.com/dtepgit65/image/upload/v1744490854/Ridee/Default/profileimage.png"
                alt="profile"
                className="w-full h-full object-cover rounded-full"
              />
            </button>
          </div>
        </header>

        {/* Users Section */}
        {activeTab === "Users" && (
          <div className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4 md:gap-0 justify-end items-start md:items-center mb-6 md:mb-8">
              <button
                onClick={() => setShowUserModal(true)}
                className="w-full md:w-auto bg-gradient-to-br from-[#fe121a] to-[#ff4d4d] text-white px-5 py-2 md:py-3 rounded-xl hover:shadow-lg hover:shadow-[#fe121a]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <FiPlus className="text-lg" />
                <span className="text-sm md:text-base">New User</span>
              </button>
            </div>

            {/* Responsive Table Container */}
            <div className="overflow-x-auto">
              <div className="min-w-[600px] bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-[#e5e7eb]/50">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#fe121a]/5 to-[#fe121a]/3">
                    <tr>
                      <th className="px-4 md:px-6 py-3 text-left text-sm md:text-base text-[#111827] font-medium">
                        Name
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-sm md:text-base text-[#111827] font-medium">
                        Email
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-sm md:text-base text-[#111827] font-medium">
                        Subscription Type
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-sm md:text-base text-[#111827] font-medium">
                        Subscribe
                      </th>
                      <th className="px-4 md:px-6 py-3 text-left text-sm md:text-base text-[#111827] font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user?._id}
                        className="border-t border-[#e5e7eb]/50 hover:bg-[#fe121a]/3 transition-colors group"
                      >
                        <td className="px-4 md:px-6 py-3 text-sm md:text-base text-[#111827] font-medium">
                          {user?.fullname}
                        </td>
                        <td className="px-4 md:px-6 py-3 text-sm md:text-base text-[#111827]/80">
                          {user?.email}
                        </td>
                        <td className="px-4 md:px-6 py-3 text-sm md:text-base text-[#111827]/80 capitalize">
                          {user?.subscriptionType}
                        </td>
                        <td className="px-4 md:px-6 py-3">
                          <div className="flex items-center gap-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                user?.isSubscribed
                                  ? "bg-green-500"
                                  : "bg-red-500"
                              }`}
                            />
                            <span
                              className={`text-xs md:text-sm ${
                                user?.isSubscribed
                                  ? "text-green-700"
                                  : "text-red-700"
                              }`}
                            >
                              {user?.isSubscribed ? "True" : "False"}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 md:px-6 py-3">
                          <div className="flex items-center gap-2">
                            <button className="text-red-600 hover:bg-red-100/50 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                              onClick={()=>{cancelSubscribe(user?._id)}}
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Logs Section */}
        {activeTab === "Logs" && (
          <div className="p-4 md:p-6">
          <div className="overflow-x-auto">
            <div className="min-w-[600px] bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-[#e5e7eb]/50">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#fe121a]/5 to-[#fe121a]/3">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm text-[#111827] font-medium">
                      Method
                    </th>
                    <th className="px-4 py-3 text-left text-sm text-[#111827] font-medium">
                      Route
                    </th>
                    <th className="px-4 py-3 text-left text-sm text-[#111827] font-medium">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-sm text-[#111827] font-medium">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log, index) => (
                    <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-[#111827]">{log.method}</td>
                      <td className="px-4 py-3 text-sm text-[#111827]/80">{log.route}</td>
                      <td className="px-4 py-3 text-sm text-[#111827]/80">{log.status}</td>
                      <td className="px-4 py-3 text-sm text-[#111827]/80">{log.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        )}

        {/* Modals */}
        <UserModal
          isOpen={showUserModal}
          onClose={() => setShowUserModal(false)}
        />
      </div>

      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 md:hidden z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default PageTransition(AdminDashboard);
