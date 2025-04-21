import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useNavigate } from 'react-router-dom';
import { FaFileInvoiceDollar, FaLock, FaTerminal, FaUserLock } from 'react-icons/fa';
import { AiFillCode, AiOutlineRocket, AiOutlineSecurityScan } from 'react-icons/ai';

const Home = () => {
  // Refs for GSAP animations
  const heroRef = useRef();
  const featureCardsRef = useRef([]);
  const processStepsRef = useRef([]);
  const navigate = useNavigate();

  // GSAP animations
  useGSAP(() => {
    // Hero section animation
    gsap.from(".hero-content > *", {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out"
    });

    // Feature cards animation
    gsap.from(featureCardsRef.current, {
      y: 80,
      opacity: 0,
      stagger: 0.15,
      scrollTrigger: {
        trigger: ".features-section",
        start: "top 75%",
      }
    });

    // Process steps animation
    gsap.from(processStepsRef.current, {
      x: -50,
      opacity: 0,
      stagger: 0.2,
      scrollTrigger: {
        trigger: ".process-section",
        start: "top 75%",
      }
    });
  });

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navbar */}
      <nav className="fixed w-full py-2 bg-white/95 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-3xl font-bold text-red-600">FinConnect</span>
            </div>

            {/* <div className="hidden md:block">
              <div className="flex space-x-8">
                <a href="#" className="text-gray-900 hover:text-red-600 transition">Home</a>
                <a href="#" className="text-gray-900 hover:text-red-600 transition">Features</a>
                <a href="#" className="text-gray-900 hover:text-red-600 transition">How it works</a>
                <a href="#" className="text-gray-900 hover:text-red-600 transition">Pricing</a>
              </div>
            </div> */}

            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 rounded-md text-gray-900 hover:bg-gray-100 transition cursor-pointer"
                onClick={() => navigate('/login')}
              >
                Log in
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition cursor-pointer"
                onClick={() => navigate('/register')}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 hero-content">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Empower Your <span className="text-red-600">Dev Journey</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
            Supercharge your workflow with blazing-fast APIs and tools that just work all in one place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition transform hover:scale-105 cursor-pointer"
              onClick={() => navigate('/register')}
            >
              Get Started
            </button>
            <button className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition transform hover:scale-105 cursor-pointer"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </div>

        {/* Hero graphic */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="relative h-80 bg-gradient-to-r from-red-50 to-gray-50 rounded-2xl overflow-hidden border border-gray-200">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-6 p-6 w-full">
                <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
                  <AiFillCode className="w-10 h-10 mb-3 text-gray-800" />
                  <p className="text-sm font-medium text-gray-800">Instant APIs</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
                  <AiOutlineSecurityScan className="w-10 h-10 mb-3 text-gray-800" />
                  <p className="text-sm font-medium text-gray-800">Secure Auth</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center justify-center">
                  <AiOutlineRocket className="w-10 h-10 mb-3 text-gray-800" />
                  <p className="text-sm font-medium text-gray-800">Fast Access</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 features-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to build, deploy, and manage your projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                ref={el => featureCardsRef.current[index] = el}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md border border-gray-100"
              >
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6 text-red-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 process-section">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get started in just a few simple steps.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  ref={el => processStepsRef.current[index] = el}
                  className="relative bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center lg:text-left"
                >
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 text-red-600 mx-auto lg:mx-0">
                    <span className="text-2xl font-bold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-red-600 text-white cta-section">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Built for Developers. Optimized for Speed.</h2>
          <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto">
            A modern toolkit to test, deploy, and manage your APIs in one place with simplicity and performance in mind.
          </p>
          <button
            className="px-8 py-4 bg-white text-red-600 rounded-lg hover:bg-gray-100 font-semibold text-lg cursor-pointer hover:scale-105 transition-all ease-in duration-300"
            onClick={() => navigate('/register')}
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto">
          {/* <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-2xl font-bold text-white">Webkode</span>
              <p className="mt-2">Made with ❤️ at Webkode '25</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
              <div>
                <h4 className="text-white font-medium mb-3">Product</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition">Features</a></li>
                  <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition">API</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-3">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition">About</a></li>
                  <li><a href="#" className="hover:text-white transition">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition">Careers</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-3">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                  <li><a href="#" className="hover:text-white transition">Terms</a></li>
                  <li><a href="#" className="hover:text-white transition">GitHub</a></li>
                </ul>
              </div>
            </div>
          </div> */}

          {/* <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>© 2025 Webkode. All rights reserved.</p>
          </div> */}
          <div className="text-center">
            <p>© 2025 FinConnect. All rights reserved. Developed and Owned by MetaStackers</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Data
const features = [
  {
    icon: <FaUserLock size={20} />,
    title: 'Role-Based Dashboards',
    description: 'Personalized dashboards for admins, developers, and managers — each with tools that matter.'
  },
  {
    icon: <FaLock size={20} />,
    title: 'Secure Data Exchange',
    description: 'End-to-end encrypted transfers ensure your files and data stay protected at every step.'
  },
  {
    icon: <FaFileInvoiceDollar size={20} />,
    title: 'Automated Invoicing',
    description: 'Smart billing with auto-generated invoices, real-time tracking, and client reminders.'
  },
  {
    icon: <FaTerminal size={20} />,
    title: 'Built-in Dev Toolkit',
    description: 'Access terminal, test APIs, manage code snippets — all inside your workflow hub.'
  }
];


const steps = [
  {
    title: 'Register',
    description: 'Create your developer account.'
  },
  {
    title: 'Subscribe',
    description: 'Choose your plan'
  },
  {
    title: 'Access Dashboard',
    description: 'tart integrating APIs'
  }
];

export default Home;
