import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import PageTransition from "../../PageTransition";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { BeatLoader } from "react-spinners";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const containerRef = useRef(null);
  const formRef = useRef(null);
  const illustrationRef = useRef(null);
  const [btnLoading, setBtnLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tp = localStorage.getItem("tp");
    if (token && tp === "dv") {
      return navigate("/dashboard");
    } else if (token && tp === "ad") {
      return navigate("/admin/dashboard");
    }
  }, []);

  const navigate = useNavigate();

  useGSAP(() => {
    // Initial animations
    gsap.from(containerRef.current, {
      duration: 1,
      opacity: 0,
      scale: 0.95,
      ease: "power3.out",
    });

    gsap.from(formRef.current.children, {
      duration: 0.8,
      y: 40,
      opacity: 0,
      stagger: 0.1,
      ease: "back.out(1.2)",
      delay: 0.2,
    });

    gsap.from(illustrationRef.current.children, {
      duration: 1.2,
      x: -100,
      opacity: 0,
      stagger: 0.15,
      ease: "expo.out",
      delay: 0.4,
    });

    // Floating animation for illustration
    gsap.to(illustrationRef.current, {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  const validate = () => {
    const newErrors = { name: "", email: "", password: "" };
    if (name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }
    if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      newErrors.email = "Please enter a valid email";
    }
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
          {
            fullname: name,
            email,
            password,
            role: "Developer",
          }
        );
        if (response.status === 200) {
          toast.success("Registered Successfully");
          sessionStorage.setItem("token", response.data.token);
          return navigate("/otpverification", { state: { Isregister: true } });
        }
      } catch (error) {
        console.log(error);
        toast.error(
          error?.response?.data?.message[0].msg ||
            error?.response?.data?.message ||
            "Oops! Something went wrong"
        );
      }
    }
    setBtnLoading(false);
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Background particles */}
      <div className="absolute inset-0 z-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#fe121a]/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + (i % 5)}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      <div className="grid md:grid-cols-2 max-w-7xl w-full gap-16 z-10">
        {/* Animated Illustration */}
        <div
          ref={illustrationRef}
          className="hidden md:flex items-center justify-center p-8"
        >
          <div className="relative w-full h-96">
            <div className="absolute inset-0 bg-gradient-to-r from-[#fe121a] to-[#ff5258] rounded-3xl transform rotate-6" />
            <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl flex items-center justify-center p-8">
              <svg className="w-full h-auto" viewBox="0 0 500 500">
                <path
                  fill="#fe121a"
                  d="M250,100 L400,250 L250,400 L100,250 Z"
                  opacity="0.1"
                />
                <circle
                  cx="250"
                  cy="250"
                  r="80"
                  fill="none"
                  stroke="#fe121a"
                  strokeWidth="2"
                />
                <path
                  fill="#fe121a"
                  d="M250,170 L300,250 L250,330 L200,250 Z"
                />
                <path fill="#e5e7eb" d="M120,120 L150,150 L120,180 L90,150 Z" />
                <path
                  fill="#e5e7eb"
                  d="M380,380 L410,410 L380,440 L350,410 Z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex items-center justify-center">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-[#e5e7eb]"
          >
            <div className="mb-8 space-y-2">
              <h1 className="text-5xl font-extrabold bg-gradient-to-r from-[#fe121a] to-[#ff5258] bg-clip-text text-transparent">
                FinConnect
              </h1>
              <p className="text-gray-600 font-semibold">
                Developers Financial Gateway
              </p>
            </div>

            <div className="space-y-6">
              {/* Name Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Fullname
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.name
                      ? "border-red-500"
                      : "border-[#e5e7eb] hover:border-[#fe121a]/30"
                  } focus:ring-2 focus:ring-[#fe121a]/50 focus:border-transparent transition-all outline-none`}
                  placeholder="developerahsan"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm animate-shake">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email
                      ? "border-red-500"
                      : "border-[#e5e7eb] hover:border-[#fe121a]/30"
                  } focus:ring-2 focus:ring-[#fe121a]/50 focus:border-transparent transition-all outline-none`}
                  placeholder="developer@company.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm animate-shake">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.password
                        ? "border-red-500"
                        : "border-[#e5e7eb] hover:border-[#fe121a]/30"
                    } focus:ring-2 focus:ring-[#fe121a]/50 focus:border-transparent transition-all pr-12 outline-none`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 p-2 text-gray-400 hover:text-[#fe121a] transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <FaEye size={20} />
                    ) : (
                      <FaEyeSlash size={20} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-sm animate-shake">
                    {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className={`w-full py-3.5 px-6  rounded-xl font-semibold 
                         hover:shadow-lg hover:shadow-red-100 transition-all transform hover:scale-[1.02] active:scale-95 ${
                           btnLoading
                             ? "bg-[#fe8a8e] text-gray-300 cursor-not-allowed"
                             : "bg-[#fe121a] text-white cursor-pointer"
                         }`}
              >
                {btnLoading ? (
                  <BeatLoader color="#fff" size={10} />
                ) : (
                  "Register"
                )}
              </button>

              <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-[#fe121a] hover:text-[#ff5258] underline underline-offset-4 transition-colors cursor-pointer"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PageTransition(Register);
