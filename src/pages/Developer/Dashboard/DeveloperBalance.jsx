import { useEffect, useState } from "react";
import { FiDollarSign, FiRefreshCw } from "react-icons/fi";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Developer/Dashboard/Navbar";
import axios from "axios"; // Import axios to make HTTP requests

const DeveloperBalance = () => {
  const [balanceData, setBalanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for error handling

  const navigate = useNavigate();

  // Fetch balance data from the backend API
  useEffect(() => {
    const fetchBalanceData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/balance`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBalanceData(response.data.account); // Set the balance data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching balance:", error);
        setError("Failed to load balance data"); // Set error state
        setLoading(false);
      }
    };

    fetchBalanceData();
  }, []);

  // Chart configuration
  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    colors: ["#fe121a"],
    markers: {
      size: 5,
      colors: ["#fe121a"],
      strokeWidth: 0,
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: {
        style: {
          colors: "#6b7280",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value) => `$${value.toLocaleString()}`, // Change currency symbol to USD
        style: {
          colors: "#6b7280",
        },
      },
    },
    tooltip: {
      x: {
        formatter: (value) => `Day ${value + 1}`,
      },
    },
  };


  // Random data for chart
  // const randomData = [
  //   Math.floor(Math.random() * 10000), // Random values for testing
  //   Math.floor(Math.random() * 10000),
  //   Math.floor(Math.random() * 10000),
  //   Math.floor(Math.random() * 10000),
  //   Math.floor(Math.random() * 10000),
  //   Math.floor(Math.random() * 10000),
  //   Math.floor(Math.random() * 10000),
  // ];

  const randomData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10000));

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse bg-gray-200 rounded-lg p-6 w-96">
          <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-12 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  // Balance data not found
  if (!balanceData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fff8f8] to-[#fafafa] flex flex-col md:flex-row">
        <Navbar location="Balance" />
        <div className="lex-1 p-6 md:p-8 max-w-6xl mx-auto text-[#fe121a] text-6xl font-bold">
          Failed to load balance data
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff8f8] to-[#fafafa] flex flex-col md:flex-row">
      <Navbar location="Balance" />
      <div className="flex-1 p-6 md:p-8 max-w-6xl mx-auto">
        {/* Balance Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <FiDollarSign className="w-12 h-12 text-red-600 p-2 bg-red-50 rounded-xl" />
              <div>
                <h2 className="text-xl font-semibold text-gray-600">
                  Current Balance
                </h2>
                <p className="text-4xl font-bold text-gray-900 mt-1">
                  {balanceData.balance.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-gray-500 flex items-center space-x-2">
                <FiRefreshCw className="w-4 h-4" />
                <span>
                  Updated: {new Date(balanceData.lastUpdated).toLocaleString()}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Balance Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              7-Day Balance Trend
            </h3>
            <div className="flex space-x-4">
              <button className="text-sm text-red-600 font-medium">
                1 Week
              </button>
              <button className="text-sm text-gray-500 hover:text-gray-900">
                1 Month
              </button>
            </div>
          </div>

          <div className="h-96">
            <Chart options={chartOptions}
            series={[{ name: "Balance", data: randomData }]} // Random data for
            balance type="line" height="100%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperBalance;
