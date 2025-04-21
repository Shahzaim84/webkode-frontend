import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageTransition from '../../PageTransition';
import toast from 'react-hot-toast';
import axios from "axios";

const OTPVerification = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [errors, setErrors] = useState({ otp: '' });
    const [timeLeft, setTimeLeft] = useState(300);
    const [resendCooldown, setResendCooldown] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const containerRef = useRef(null);
    const formRef = useRef(null);
    const illustrationRef = useRef(null);
    const inputRefs = useRef([]);

    const location = useLocation();
    const { Isregister } = location?.state;

    const navigate = useNavigate();

    // Timer countdown
    useEffect(() => {
        if (timeLeft > 0 && !isSubmitted) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft, isSubmitted]);

    useEffect(() => {
        if (resendCooldown > 0) {
            const cooldownTimer = setInterval(() => {
                setResendCooldown((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(cooldownTimer);
        }
    }, [resendCooldown]);


    useGSAP(() => {
        gsap.from(containerRef.current, {
            duration: 1,
            opacity: 0,
            scale: 0.95,
            ease: 'power3.out'
        });

        gsap.from(formRef.current.children, {
            duration: 0.8,
            y: 40,
            opacity: 0,
            stagger: 0.1,
            ease: 'back.out(1.2)',
            delay: 0.2
        });

        gsap.from(illustrationRef.current.children, {
            duration: 1.2,
            x: -100,
            opacity: 0,
            stagger: 0.15,
            ease: 'expo.out',
            delay: 0.4
        });

        gsap.to(illustrationRef.current, {
            y: 20,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: 'power1.inOut'
        });
    }, []);

    const handleOtpChange = (index, value) => {
        if (/^\d*$/.test(value) && value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto-focus next input
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const validate = () => {
        const isValid = otp.every(digit => digit !== '');
        if (!isValid) {
            setErrors({ otp: 'Please enter the complete OTP code' });
            return false;
        }
        setErrors({ otp: '' });
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            let url ;
            let navigate2 ;
            if(Isregister){
                url = `${import.meta.env.VITE_BACKEND_URL}/auth/otpcheck/account-verified`
                navigate2 = "/login";
            }else{
                url = `${import.meta.env.VITE_BACKEND_URL}/auth/otpcheck/changepassword`
                navigate2 = "/changepassword";
            }
            try {
                const response = await axios.post(
                  url,
                  {
                    otp: otp.join("")
                  },
                  {
                    headers:{
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`
                      }
                  }
                );
                if (response.status === 200) {
                    toast.success("Verified Successfully");
                    if(Isregister){
                        sessionStorage.removeItem("token", response.data.token);
                    }
                  return navigate(navigate2);
                }
              } catch (error) {
                console.log(error);
                toast.error(
                  error?.response?.data?.message[0].msg || error?.response?.data?.message || "Oops! Something went wrong"
                );
              }
        }
    };

    const resendOtp = async () => {
            setTimeLeft(300);
            setResendCooldown(60);
            let url ;
            if(Isregister){
                url = `${import.meta.env.VITE_BACKEND_URL}/auth/otpresend/account-verified`
            }else{
                url = `${import.meta.env.VITE_BACKEND_URL}/auth/otpresend/changepassword`
            }
            try {
                const response = await axios.get(url,
                  {
                    headers:{
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`
                      }
                  }
                );
                if (response.status === 200) {
                    toast.success("OTP Send Successfully");
                }
              } catch (error) {
                console.log(error);
                toast.error(
                  error?.response?.data?.message[0].msg || error?.response?.data?.message || "Oops! Something went wrong"
                );
              }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div ref={containerRef} className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background particles */}
            <div className="absolute inset-0 z-0">
                {[...Array(30)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 bg-[#fe121a]/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${5 + i % 5}s infinite ease-in-out`
                        }}
                    />
                ))}
            </div>

            <div className="grid md:grid-cols-2 max-w-7xl w-full gap-16 z-10">
                {/* Animated Illustration */}
                <div ref={illustrationRef} className="hidden md:flex items-center justify-center p-8">
                    <div className="relative w-full h-96">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#fe121a] to-[#ff5258] rounded-3xl transform rotate-6" />
                        <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl flex items-center justify-center p-8">
                            <svg className="w-full h-auto" viewBox="0 0 500 500">
                                <path fill="#fe121a" d="M250,100 L400,250 L250,400 L100,250 Z" opacity="0.1" />
                                <circle cx="250" cy="250" r="80" fill="none" stroke="#fe121a" strokeWidth="2" />
                                <path fill="#fe121a" d="M250,170 L300,250 L250,330 L200,250 Z" />
                                <path fill="#e5e7eb" d="M120,120 L150,150 L120,180 L90,150 Z" />
                                <path fill="#e5e7eb" d="M380,380 L410,410 L380,440 L350,410 Z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Form Section */}
                <div className="flex items-center justify-center">
                    <form ref={formRef} onSubmit={handleSubmit} className="w-full max-w-md bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-[#e5e7eb]">
                        <div className="mb-8 space-y-4">
                            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#fe121a] to-[#ff5258] bg-clip-text text-transparent">
                                OTP Verification
                            </h1>
                            <p className="text-gray-600">
                                We've sent a 6-digit OTP code to your email
                            </p>
                            <p className="text-sm text-red-500 font-medium">
                                This code is valid only for {formatTime(timeLeft)}
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* OTP Inputs */}
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-center gap-3">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            type="text"
                                            value={digit}
                                            onChange={(e) => handleOtpChange(index, e.target.value)}
                                            className={`w-12 h-12 text-center text-xl border rounded-xl focus:outline-none 
                                ${errors.otp ? 'border-red-500' : 'border-[#e5e7eb]'} 
                                focus:ring-2 focus:ring-[#fe121a]/50 transition-all`}
                                            maxLength="1"
                                        />
                                    ))}
                                </div>
                                {errors.otp && <p className="text-red-500 text-sm animate-shake text-center">{errors.otp}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitted}
                                className="w-full py-3.5 px-6 bg-gradient-to-r from-[#fe121a] to-[#ff5258] text-white rounded-xl font-semibold 
                         hover:shadow-lg hover:shadow-red-100 transition-all transform hover:scale-[1.02] active:scale-95 
                         disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {isSubmitted ? 'Verifying...' : 'Verify OTP'}
                            </button>

                            <div className="text-center text-sm text-gray-600">
                                Didn't receive code?{' '}
                                <button
                                    type="button"
                                    disabled={resendCooldown > 0}
                                    onClick={resendOtp}
                                    className={`font-semibold underline underline-offset-4 transition-colors ${resendCooldown > 0
                                            ? 'text-gray-400 cursor-not-allowed'
                                            : 'text-[#fe121a] hover:text-[#ff5258] cursor-pointer'
                                        }`}
                                >
                                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend OTP'}
                                </button>

                            </div>

                            <div className="text-center text-sm text-gray-600">
                                Return to{' '}
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

export default PageTransition(OTPVerification);