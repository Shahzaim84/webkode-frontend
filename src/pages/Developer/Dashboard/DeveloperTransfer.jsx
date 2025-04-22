import { useContext, useState } from "react";
import {
  FiArrowRight,
  FiDollarSign,
  FiCheckCircle,
  FiRefreshCw,
} from "react-icons/fi";
import { BsBank2 } from "react-icons/bs";
import Navbar from "../../../components/Developer/Dashboard/Navbar";
import { DeveloperDataContext } from "../../../context/DeveloperContext";
import toast from "react-hot-toast";
import axios from "axios";

const DeveloperTransfer = () => {
  const [loading, setLoading] = useState(false);
  const [transferData, setTransferData] = useState({
    accountId: "",
    amount: "",
  });
  const [errors, setErrors] = useState({});
  const [successData, setSuccessData] = useState(null);
  const {developer} = useContext(DeveloperDataContext);

  // Mock account for example — replace with API fetch later
  const account = {
    id: "1",
    name: "Primary Account •••• 6789",
    balance: 52450,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newErrors = {};
    if (!transferData.accountId || transferData.accountId.length < 1) {
      newErrors.accountId = "Please enter a valid Account ID";
    }
    if (!transferData.amount || isNaN(transferData.amount)) {
      newErrors.amount = "Please enter a valid amount";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/transfer`,
    {
      destinationId: transferData.accountId,
      amount: transferData.amount
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
      );
      toast.success("Amount Transfer Successfully");
      setSuccessData({
        from: developer?._id,
        amount: transferData.amount,
        newBalance: response.data.balance,
      });
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Oops! Something went wrong"
      );
    }
    

    setLoading(false);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8f8] to-[#fafafa] flex flex-col md:flex-row">
      <Navbar location="Transfer" />
      <div className="flex-1 p-6 md:p-8 max-w-2xl mx-auto">
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
                Enter account ID and transfer amount
              </p>
            </div>

            {/* Account ID input */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <BsBank2 className="w-4 h-4 text-gray-500" />
                Account ID
              </label>
              <input
                type="text"
                value={transferData.accountId}
                onChange={(e) =>
                  setTransferData({ ...transferData, accountId: e.target.value })
                }
                className={`w-full p-3 rounded-lg border ${
                  errors.accountId ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none`}
                placeholder="Enter Account ID"
              />
              {errors.accountId && (
                <p className="text-red-500 text-sm mt-1">{errors.accountId}</p>
              )}
            </div>

            {/* Amount */}
            <div className="mb-8">
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FiDollarSign className="w-4 h-4 text-gray-500" />
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  value={transferData.amount}
                  onChange={(e) =>
                    setTransferData({ ...transferData, amount: e.target.value })
                  }
                  className={`w-full pl-8 p-3 rounded-lg border ${
                    errors.amount ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all outline-none`}
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
              className="w-full bg-red-600 text-white py-3.5 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
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
                <span className="text-gray-600">Amount Transferred:</span>
                <span className="font-bold text-red-600">
                  ${successData.amount}
                </span>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg flex items-center gap-3">
              <FiDollarSign className="w-6 h-6 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Updated Balance:</p>
                <p className="font-bold text-gray-900 text-xl">
                  ${successData.newBalance.toLocaleString()}
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
