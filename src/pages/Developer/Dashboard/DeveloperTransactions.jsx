import { useState, useEffect, useContext } from "react";
import { FiArrowLeft, FiArrowRight, FiSend } from "react-icons/fi";
import { GiReceiveMoney } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Developer/Dashboard/Navbar";
import axios from "axios";
import toast from "react-hot-toast";
import { DeveloperDataContext } from "../../../context/DeveloperContext";

const DeveloperTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  const navigate = useNavigate();

  const {developer} = useContext(DeveloperDataContext)

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

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("token"); // assuming you store it like this
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/transactions?page=${currentPage}&pageSize=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setTransactions(response.data.data.transactions);
        setTotalPages(response.data.data.totalPages); // Set totalPages directly from backend response
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        toast.error(
          error?.response?.data?.message || "Oops! Something went wrong"
        );
      }
    };

    fetchTransactions();
  }, [currentPage]); // Trigger the effect when the page changes

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8f8] to-[#fafafa] flex flex-col md:flex-row">
      <Navbar location="Transactions" />
      <div className="flex-1 p-6 md:p-8 max-w-6xl mx-auto">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Transaction History
            </h1>
            <p className="text-gray-500 mt-1">
              All your financial transactions in one place
            </p>
          </div>
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

        {/* Pagination */}
        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <FiArrowLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="hidden md:flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-red-600 text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
            <FiArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeveloperTransaction;
