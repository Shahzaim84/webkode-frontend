import { useState } from "react";
import {
  FiArrowUpRight,
  FiList,
  FiFileText,
  FiUser,
  FiActivity,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Developer/Dashboard/Navbar";

const DeveloperDashboard = () => {

  const navigate = useNavigate();

  const user = { name: "John" };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8f8] to-[#fafafa] flex flex-col md:flex-row">
      <Navbar location="Dashboard"/>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1.5">
              Welcome back, <span className="text-red-600">{user.name}</span>!
              👋
            </h1>
            <p className="text-gray-500 text-sm md:text-base">
              {new Date().toLocaleDateString("en-GB", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center space-x-3 bg-white px-4 py-2.5 rounded-lg shadow-xs border border-gray-100 w-full md:w-auto">
            <FiUser className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-medium text-sm md:text-base">
              Developer Account
            </span>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-2xl shadow-2xl p-6 mb-8 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background:
                "radial-gradient(circle at 100% 100%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)",
            }}
          ></div>
          <div className="flex flex-col md:flex-row justify-between items-start relative z-10">
            <div className="text-white mb-4 md:mb-0">
              <h2 className="text-sm font-medium mb-3 opacity-90">
                Available Balance
              </h2>
              <p className="text-3xl md:text-4xl font-bold mb-6">₹12,450</p>
            </div>
            <button className="bg-white/10 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl hover:bg-white/20 transition-all flex items-center space-x-2 border border-white/20 w-full md:w-auto justify-center">
              <FiArrowUpRight className="w-5 h-5" />
              <span className="font-medium">New Transaction</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
          {[
            {
              title: "API Usage",
              value: "1,234 Calls",
              icon: <FiActivity className="w-6 h-6 text-red-600" />,
              change: "+12% from last month",
              color: "bg-red-50",
            },
            {
              title: "Active Services",
              value: "8 Running",
              icon: <FiList className="w-6 h-6 text-green-600" />,
              change: "2 New services",
              color: "bg-green-50",
            },
            {
              title: "Pending Invoices",
              value: "₹2,450",
              icon: <FiFileText className="w-6 h-6 text-purple-600" />,
              change: "1 Unpaid invoice",
              color: "bg-purple-50",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white p-4 md:p-6 rounded-xl shadow-xs border border-gray-100 hover:shadow-sm transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium mb-2 md:mb-4">
                    {stat.title}
                  </h3>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mb-1 md:mb-2">
                    {stat.value}
                  </p>
                  <span className="text-gray-500 text-xs md:text-sm">
                    {stat.change}
                  </span>
                </div>
                <div className={`${stat.color} p-2 md:p-3 rounded-lg`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-xs border border-gray-100 p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 md:mb-0">
              Recent Transactions
            </h2>
            <button className="text-red-600 text-sm font-medium flex items-center space-x-1">
              <span>View All</span>
              <FiArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3 md:space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-3 md:p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-3 mb-2 md:mb-0">
                  <div className="bg-red-50 p-2 rounded-lg">
                    <FiArrowUpRight className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm md:text-base">
                      API Subscription
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500">
                      12 Oct 2023 • 14:32
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900 text-sm md:text-base">
                    - ₹1,999
                  </p>
                  <p className="text-xs md:text-sm text-gray-500">
                    Standard Plan
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeveloperDashboard;
