import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import { FaFire, FaCrown } from "react-icons/fa";
import PageTransition from "../../PageTransition";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import toast from "react-hot-toast";

const Pricing = () => {
  const container = useRef();
  const [btnLoading, setBtnLoading] = useState(false);
  const plans = [
    {
      name: "Basic",
      price: "$6",
      features: ["Core tools access", "Email support", "Limited API usage"],
      popular: false,
      color: "from-blue-100/50 via-white to-white",
    },
    {
      name: "Standard",
      price: "$10",
      features: [
        "Everything in Basic",
        "Unlimited API access",
        "Team collaboration",
        "Priority support",
      ],
      popular: true,
      color: "from-red-100/30 via-white to-white",
    },
    {
      name: "Premium",
      price: "$15",
      features: [
        "Everything in Standard",
        "Dedicated account manager",
        "Custom integrations",
        "Enterprise SLAs",
      ],
      popular: false,
      color: "from-purple-100/50 via-white to-white",
    },
  ];

  useGSAP(
    () => {
      gsap.from(".pricing-card", {
        opacity: 0,
        y: 80,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });

      gsap.from(".hero-heading", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "expo.out",
      });

      gsap.from(".feature-item", {
        opacity: 0,
        x: -20,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".pricing-cards",
          start: "top 70%",
        },
      });
    },
    { scope: container }
  );

  const subscribe = async (plan) => {
    setBtnLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/subscriptions/payment`,
        {
          susbscriptionType: plan,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setBtnLoading(false);
        window.location.href = response.data.url;
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Oops! Something went wrong"
      );
    }
    setBtnLoading(false);
  };

  const PricingCard = ({ plan }) => {
    return (
      <div
        className={`relative flex flex-col p-8 bg-gradient-to-br ${
          plan.color
        } rounded-2xl border-2 cursor-pointer w-80 ${
          plan.popular ? "border-red-300/80 scale-[1.02]" : "border-gray-200/80"
        } shadow-xl backdrop-blur-sm hover:-translate-y-2 hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.18)] shadow-[0_20px_25px_-5px_rgba(0, 0, 0, 0.1)] transition-all duration-300 hover:z-10`}
      >
        {plan.popular && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg shadow-red-200/50 flex items-center gap-2">
            Most Popular
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-3xl font-bold text-gray-900 mb-2">
            {plan.name}{" "}
            {plan.name === "Premium" && (
              <FaCrown className="w-6 h-6 text-amber-500" />
            )}
          </h3>
          <div className="text-5xl font-extrabold text-gray-900">
            {plan.price}
            <span className="text-xl font-medium text-gray-500 ml-2">
              /month
            </span>
          </div>
        </div>

        <ul className="space-y-4 mb-12 flex-1">
          {plan.features.map((feature, index) => (
            <li key={index} className="feature-item flex items-center gap-3">
              <span className="text-gray-600 font-medium">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          className={`w-full flex justify-center items-center gap-2 py-4 rounded-xl font-semibold transition-all duration-300 ${
            plan.popular
              ? "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:shadow-red-200/50 hover:-translate-y-0.5"
              : "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-0.5"
          } ${btnLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
          onClick={() => subscribe(plan.name)}
          disabled={btnLoading}
        >
          {btnLoading ? (
            <BeatLoader color="#fff" size={10} />
          ) : (
            <>
              Subscribe
              {plan.popular && (
                <FaFire className="w-4 h-4 text-amber-200 animate-pulse" />
              )}
            </>
          )}
        </button>
      </div>
    );
  };

  return (
    <div
      ref={container}
      className="min-h-screen bg-gradient-to-br from-gray-50/50 to-white"
    >
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="hero-heading text-center mb-20">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Simple pricing for{" "}
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
              powerful tools
            </span>
          </h1>
          <p className="text-xl text-gray-600">
            Start building today with our developer-friendly platform
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 px-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CheckIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 13l4 4L19 7"
    />
  </svg>
);

export default PageTransition(Pricing);
