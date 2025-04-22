import React, {useState, useEffect} from 'react'
import { FiCheckCircle, FiXCircle, FiHome } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const SuccesssPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState(null);

  useEffect(() => {
    // Extract the session_id from the URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const sessionId = queryParams.get('session_id');

    if (sessionId) {
      console.log(sessionId)
      // Make an API call to your backend to verify the session
      const fetchPaymentDetails = async () => {
        try {
          const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/subscription/subscribe`,
        {
          sessionId
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
          );
          
          if (response.status === 200) {
            toast.success('Payment successful!');
            navigate("/dashboard");
          }
          console.log(response)
        } catch (error) {
          toast.error(
            error?.response?.data?.message || "Oops! Something went wrong"
          );
        }
      };

      fetchPaymentDetails();
    }
  }, [location.search]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
       <div className="max-w-md w-full text-center animate-fade-in">
         <div className="relative inline-block mb-8">
           <div className="absolute inset-0 bg-green-200/30 blur-2xl rounded-full animate-pulse-slow" />
           <FiCheckCircle className="w-32 h-32 text-green-600 mx-auto animate-bounce-in" />
         </div>

         <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-green-100">
           <h1 className="text-3xl font-bold text-green-600 mb-4">
             Payment Successful!
           </h1>
           <p className="text-gray-600 mb-6">
             Your subscription has been activated successfully. Enjoy !
           </p>

           {/* <button className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all gap-2 w-full cursor-pointer"
            onClick={()=> navigate("/dashboard")}
           >
             <FiHome className="w-5 h-5" />
              Go to Dashboard
           </button> */}
         </div>
       </div>
     </div>
  )
}

export default SuccesssPayment
