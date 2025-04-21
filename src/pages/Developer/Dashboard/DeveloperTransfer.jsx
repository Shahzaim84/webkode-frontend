import { useState } from "react";
import {
  FiArrowRight,
  FiDollarSign,
  FiCheckCircle,
  FiRefreshCw,
} from "react-icons/fi";
import { BsBank2 } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Developer/Dashboard/Navbar";

const DeveloperTransfer = () => {
  const [loading, setLoading] = useState(false);
  const [transferData, setTransferData] = useState({
    from: "",
    to: "",
    amount: "",
  });
  const [errors, setErrors] = useState({});
  const [successData, setSuccessData] = useState(null);
  const navigate = useNavigate();

  // Mock accounts - replace with actual data
  const accounts = [
    { id: "1", name: "Primary Account •••• 6789", balance: 52450 },
    { id: "2", name: "Savings Account •••• 4321", balance: 150000 },
    { id: "3", name: "Business Account •••• 9876", balance: 250000 },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simple validation
    const newErrors = {};
    if (!transferData.from) newErrors.from = "Please select source account";
    if (!transferData.to) newErrors.to = "Please select destination account";
    if (!transferData.amount || isNaN(transferData.amount))
      newErrors.amount = "Please enter valid amount";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSuccessData({
      from: accounts.find((a) => a.id === transferData.from).name,
      to: accounts.find((a) => a.id === transferData.to).name,
      amount: transferData.amount,
      newBalance: 52450 - parseInt(transferData.amount), // Mock balance update
    });

    setLoading(false);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8f8] to-[#fafafa] flex flex-col md:flex-row">
      <Navbar location="Transfer"/>
      <div className="flex-1 p-6 md:p-8 max-w-6xl mx-auto">
        {!successData ? (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200"
          >
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <FiArrowRight className="w-6 h-6 text-red-600" />
                Transfer Funds
              </h1>
              <p className="text-gray-500 mt-2">
                Move money between your accounts
              </p>
            </div>

            {/* From Account */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <BsBank2 className="w-4 h-4 text-gray-500" />
                From Account
              </label>
              <select
                value={transferData.from}
                onChange={(e) =>
                  setTransferData({ ...transferData, from: e.target.value })
                }
                className={`w-full p-3 rounded-lg border ${
                  errors.from ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all`}
              >
                <option value="">Select Source Account</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name} (₹{account.balance.toLocaleString()})
                  </option>
                ))}
              </select>
              {errors.from && (
                <p className="text-red-500 text-sm mt-1">{errors.from}</p>
              )}
            </div>

            {/* To Account */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <BsBank2 className="w-4 h-4 text-gray-500" />
                To Account
              </label>
              <select
                value={transferData.to}
                onChange={(e) =>
                  setTransferData({ ...transferData, to: e.target.value })
                }
                className={`w-full p-3 rounded-lg border ${
                  errors.to ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all`}
              >
                <option value="">Select Destination Account</option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.id}>
                    {account.name} (₹{account.balance.toLocaleString()})
                  </option>
                ))}
              </select>
              {errors.to && (
                <p className="text-red-500 text-sm mt-1">{errors.to}</p>
              )}
            </div>

            {/* Amount */}
            <div className="mb-8">
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FiDollarSign className="w-4 h-4 text-gray-500" />
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  value={transferData.amount}
                  onChange={(e) =>
                    setTransferData({ ...transferData, amount: e.target.value })
                  }
                  className={`w-full pl-8 p-3 rounded-lg border ${
                    errors.amount ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all`}
                  placeholder="Enter amount"
                />
              </div>
              {errors.amount && (
                <p className="text-red-500 text-sm mt-1">{errors.amount}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3.5 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <FiRefreshCw className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <FiArrowRight className="w-4 h-4" />
                  Transfer Now
                </>
              )}
            </button>
          </form>
        ) : (
          /* Success Card */
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 animate-fade-in">
            <div className="text-center mb-6">
              <FiCheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Transfer Successful!
              </h2>
              <p className="text-gray-500">Your funds have been transferred</p>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">From Account:</span>
                <span className="font-medium">{successData.from}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">To Account:</span>
                <span className="font-medium">{successData.to}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Amount Transferred:</span>
                <span className="font-bold text-red-600">
                  ₹{successData.amount}
                </span>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg flex items-center gap-3">
              <FiDollarSign className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Updated Balance:</p>
                <p className="font-bold text-gray-900 text-xl">
                  ₹{successData.newBalance.toLocaleString()}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSuccessData(null)}
              className="w-full mt-6 bg-gray-900 text-white py-3.5 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Make Another Transfer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeveloperTransfer;
