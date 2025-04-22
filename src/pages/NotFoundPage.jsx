import { Link } from 'react-router-dom';
import { FiAlertTriangle, FiHome } from 'react-icons/fi';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#ff4d4d] to-[#fe121a] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Animated 404 Number */}
        <div className="relative inline-block mb-8 animate-float">
          <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full" />
          <h1 className="text-9xl font-bold text-white relative z-10">
            404
          </h1>
        </div>

        {/* Error Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/20">
          <div className="mb-6 flex justify-center">
            <FiAlertTriangle className="w-16 h-16 text-white animate-pulse" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h2>
          
          <p className="text-white/90 mb-8">
          It looks like the page you're looking for has drifted away. Let’s take you back to safety.
          </p>

          {/* Back Home Button */}
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg text-white font-medium transition-all duration-300 hover:shadow-lg gap-2 cursor-pointer"
          >
            <FiHome className="w-5 h-5" />
            Return to Homepage
          </Link>
        </div>
      </div>

      {/* Add CSS animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;