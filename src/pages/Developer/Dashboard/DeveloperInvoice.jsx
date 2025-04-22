import { useState } from "react";
import DatePicker from "react-datepicker";
import {
  FiCalendar,
  FiDownload,
  FiDollarSign,
  FiArrowUpRight,
  FiList,
  FiFileText,
  FiMenu,
  FiX,
  FiHome,
  FiRefreshCw,
} from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Developer/Dashboard/Navbar";
import axios from "axios";
import toast from "react-hot-toast";

const DeveloperInvoice = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const generateInvoice = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call to backend
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/invoice?start=${startDate.toISOString()}&end=${endDate.toISOString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setInvoiceData(response.data.data);
      }
    } catch (error) {
      console.error("Error generating invoice:", error);
      toast.error(
        error?.response?.data?.message || "Oops! Something went wrong"
      );
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8f8] to-[#fafafa] flex flex-col md:flex-row">
      <Navbar location="Invoice" />
      <div className="flex-1 p-6 md:p-8 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <FiFileText className="w-6 h-6 text-red-600" />
          Generate Invoice
        </h1>
        <p className="text-gray-500 mb-6">
          Create official transaction invoices for any period
        </p>

        <form
          onSubmit={generateInvoice}
          className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FiCalendar className="w-4 h-4 text-gray-500" />
                Start Date
              </label>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Select start date"
                className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FiCalendar className="w-4 h-4 text-gray-500" />
                End Date
              </label>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="Select end date"
                className="w-full p-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!startDate || !endDate || loading}
            className="w-full bg-red-600 text-white py-2.5 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                <FiFileText className="w-4 h-4" />
                Generate Invoice
              </>
            )}
          </button>
        </form>

        {invoiceData && (
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 animate-fade-in">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Invoice Summary
              </h3>
              <p className="text-gray-500 text-sm">
                {new Date(invoiceData.startDate).toLocaleDateString()} -{" "}
                {new Date(invoiceData.endDate).toLocaleDateString()}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {invoiceData.totalTransactions}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${invoiceData.totalAmount.toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            <a
              href={`${import.meta.env.VITE_BACKEND_URL2}/invoices/${invoiceData.filename}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gray-900 text-white py-2.5 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
            >
              <FiDownload className="w-4 h-4" />
              Download PDF Invoice
            </a>

            <p className="text-center text-gray-500 text-sm mt-4">
              Invoice generated for selected period -{" "}
              {new Date().toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeveloperInvoice;
