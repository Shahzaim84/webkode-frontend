import { useState, useEffect } from 'react';
import { FiArrowLeft, FiArrowRight, FiSearch, FiDownload, FiSend } from 'react-icons/fi';
import { GiReceiveMoney } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Developer/Dashboard/Navbar';

const DeveloperTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const pageSize = 10;

  const navigate = useNavigate();

  // Mock data - replace with API call
  useEffect(() => {
    const fetchData = async () => {
      // Simulated API call
      const mockData = {
        transactions: [
          {
            id: 1,
            date: '2024-03-25',
            amount: 1500,
            description: 'Salary Deposit',
            type: 'credit'
          },
          {
            id: 2,
            date: '2024-03-24',
            amount: -500,
            description: 'Utility Payment',
            type: 'debit'
          },
          // Add more mock transactions...
        ],
        totalPages: 5
      };

      setTransactions(mockData.transactions);
      setTotalPages(mockData.totalPages);
    };

    fetchData();
  }, [currentPage, searchQuery, filterType]);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8f8] to-[#fafafa] flex flex-col md:flex-row">
      <Navbar location="Transactions"/>
      <div className="flex-1 p-6 md:p-8 max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
            <p className="text-gray-500 mt-1">All your financial transactions in one place</p>
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <select
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All</option>
              <option value="credit">Credits</option>
              <option value="debit">Debits</option>
            </select>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-200">
            <span className="col-span-2">Description</span>
            <span>Date</span>
            <span>Type</span>
            <span className="text-right">Amount</span>
          </div>

          {/* Transactions List */}
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="group p-6 md:py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors"
            >
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                {/* Description */}
                <div className="col-span-2 flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    transaction.type === 'credit' 
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'credit' ? (
                      <GiReceiveMoney className="w-5 h-5" />
                    ) : (
                      <FiSend className="w-5 h-5" />
                    )}
                  </div>
                  <span className="font-medium">{transaction.description}</span>
                </div>

                {/* Date */}
                <div className="text-gray-600">
                  {formatDate(transaction.date)}
                </div>

                {/* Type */}
                <div className="hidden md:block">
                  <span className={`px-2 py-1 rounded-full text-sm capitalize ${
                    transaction.type === 'credit'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {transaction.type}
                  </span>
                </div>

                {/* Amount */}
                <div className={`text-right font-medium ${
                  transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatAmount(transaction.amount)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-between items-center">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
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
                    ? 'bg-red-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
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