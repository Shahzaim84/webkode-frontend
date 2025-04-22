import { useState, useEffect, useContext } from "react";
import {
  FiArrowUpRight,
  FiList,
  FiFileText,
  FiUser,
  FiActivity,
  FiSend,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Developer/Dashboard/Navbar";
import { DeveloperDataContext } from '../../../context/DeveloperContext';
import axios from "axios";
import toast from "react-hot-toast";
import { GiReceiveMoney } from "react-icons/gi";


const DeveloperDashboard = () => {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([])
  const {developer} = useContext(DeveloperDataContext)
  const navigate = useNavigate();

  useEffect(() => {
      const fetchBalanceData = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/dashboard`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setBalance(response.data.balance);
          setTransactions(response.data.transactions);
          toast.success("Welcome Back");
        } catch (error) {
          console.error("Error fetching balance:", error);
          toast.error(
            error?.response?.data?.message || "Oops! Something went wrong"
          );
        }
      };
  
      fetchBalanceData();
    }, []);

    const CancelSubscribe = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/subscriptions/cancel`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        toast.success("UnSubscribed Successfully");
        navigate("/pricing");
      } catch (error) {
        console.error("Error fetching balance:", error);
        toast.error(
          error?.response?.data?.message || "Oops! Something went wrong"
        );
      }
    };

    function extractTransactionIds(transactionString) {
      // Regular expression to match both IDs
      const regex = /from (\S+) to (\S+)/;
    
      // Execute the regex on the string
      const match = transactionString.match(regex);
    
      if (match) {
        const sourceId = match[1]; 
        return sourceId;
      } else {
        return null; // If no match is found
      }
    }

    const formatDate = (timestamp) => {
      const date = new Date(timestamp); // Convert the timestamp to a Date object
      return date.toLocaleDateString('en-US', {
        weekday: 'short', 
        year: 'numeric',  
        month: 'short',   
        day: 'numeric'    
      });
    };
  
    const formatAmount = (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD', // You can change this to any currency code you prefer
      }).format(amount);
    };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8f8] to-[#fafafa] flex flex-col md:flex-row">
      <Navbar location="Dashboard"/>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1.5">
              Welcome back, <span className="text-red-600">{developer?.fullname}</span>!
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
              <p className="text-3xl md:text-4xl font-bold mb-2">${balance}</p>
              <p>Account Id: "{developer?._id || "N/A"}"</p>
            </div>
            <button className="bg-white/10 backdrop-blur-sm text-white px-5 py-2.5 rounded-xl hover:bg-white/20 transition-all flex items-center space-x-2 border border-white/20 w-full md:w-auto justify-center cursor-pointer" onClick={CancelSubscribe}>
              <span className="font-medium">Cancel Subscription</span>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-xs border border-gray-100 p-4 md:p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2 md:mb-0">
              Recent Transactions
            </h2>
            <button className="text-red-600 text-sm font-medium flex items-center space-x-1" onClick={()=> navigate("dashboard/transactions")}>
              <span>View All</span>
              <FiArrowUpRight className="w-4 h-4" />
            </button>
          </div>

           {/* Transactions Table */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200">
                      <span className="col-span-2">Description</span>
                      <span>Date</span>
                      <span>Type</span>
                      <span className="text-right">Amount</span>
                    </div>
          
                    {transactions.length > 0 ? (
                      transactions.map((transaction) => (
                        <div
                          key={transaction._id}
                          className="group p-6 md:py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                            <div className="col-span-2 flex items-center gap-3">
                              <div
                                className={`p-2 rounded-lg ${
                                  extractTransactionIds(transaction?.description) === developer?._id
                                    ? "bg-red-100 text-red-600"
                                    : "bg-green-100 text-green-600"
                                }`}
                              >
                                {extractTransactionIds(transaction?.description) === developer?._id ? (
                                  <FiSend className="w-5 h-5" />
                                ) : (
                                  <GiReceiveMoney className="w-5 h-5" />
                                )}
                              </div>
                              <span className="font-medium">
                                {transaction.description}
                              </span>
                            </div>
          
                            <div className="text-gray-600">
                              {formatDate(transaction.timestamp)}
                            </div>
          
                            <div className="hidden md:block">
                              <span
                                className={`px-2 py-1 rounded-full text-sm capitalize ${
                                  extractTransactionIds(transaction?.description) === developer?._id
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {extractTransactionIds(transaction?.description) === developer?._id ? "Send" : "Receive"}
                              </span>
                            </div>
          
                            <div
                              className={`text-right font-medium ${
                                transaction.amount > 0 ? "text-green-600" : "text-red-600"
                              }`}
                            >
                              {formatAmount(transaction.amount)}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center">No transactions found</div>
                    )}
                  </div>
        </div>
      </main>
    </div>
  );
};

export default DeveloperDashboard;
