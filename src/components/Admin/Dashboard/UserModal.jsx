import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

const UserModal = ({ isOpen, onClose, user }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

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
          `${import.meta.env.VITE_BACKEND_URL}/admin/createuser`,
          {
            fullname: name,
            email,
            password,
            role: "Developer",
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success("Registered Successfully");
          setName("");
          setEmail("");
          setPassword("");
          onClose();
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-96 bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-[#e5e7eb] relative"
        >
          <IoCloseSharp
            className="text-[#fe121a] cursor-pointer absolute top-4 right-4"
            size={40}
            onClick={() => onClose()}
          />

          <div className="mb-8 space-y-2">
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#fe121a] to-[#ff5258] bg-clip-text text-transparent">
              Create User
            </h1>
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
              <label className="text-sm font-medium text-gray-700">Email</label>
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
                "Create User"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
