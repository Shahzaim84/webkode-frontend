import React from 'react'
import { FiCheckCircle, FiXCircle, FiHome } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const CancelPayment = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex items-center justify-center p-4">
    <div className="max-w-md w-full text-center animate-fade-in">
      <div className="relative inline-block mb-8">
        <div className="absolute inset-0 bg-red-200/30 blur-2xl rounded-full animate-pulse-slow" />
        <FiXCircle className="w-32 h-32 text-red-600 mx-auto animate-bounce-in" />
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-red-100">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          Subscription Cancelled
        </h1>
        <button className="inline-flex items-center justify-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all gap-2 w-full cursor-pointer"
            onClick={()=> navigate("/")}
        >
          <FiHome className="w-5 h-5" />
          Return to Home
        </button>
      </div>
    </div>
  </div>
  )
}

export default CancelPayment
