import React, { useState } from "react";
import {
  Search,
  MapPin,
  Calendar,
  ArrowRightLeft,
  Ticket,
  Clock,
  Star,
} from "lucide-react";
import bus from "../../assets/bus.png";
import BusLoading from "../common/BusLoading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getpathThunk } from "../../../features/booking/getpathdata/getpathThunk";
import { resetStatus } from "../../../features/booking/getpathdata/getpathSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
function HeroSection() {
  const districts = [
    "Kathmandu",
    "Lalitpur",
    "Bhaktapur",
    "Chitwan",
    "Makwanpur",
    "Kavrepalanchok",
    "Dhading",
    "Nuwakot",
    "Ramechhap",
    "Sindhupalchok",
    "Dolakha",
    "Rasuwa",
    "Morang",
    "Sunsari",
    "Jhapa",
    "Ilam",
    "Udayapur",
    "Dhankuta",
    "Bhojpur",
    "Terhathum",
    "Taplejung",
    "Khotang",
    "Okhaldhunga",
    "Solukhumbu",
    "Dhanusha",
    "Mahottari",
    "Sarlahi",
    "Siraha",
    "Saptari",
    "Rautahat",
    "Bara",
    "Parsa",
    "Rupandehi",
    "Kapilvastu",
    "Palpa",
    "Gulmi",
    "Arghakhanchi",
    "Dang",
    "Banke",
    "Bardiya",
    "Nawalpur",
    "Parasi",
    "Kaski",
    "Tanahun",
    "Syangja",
    "Baglung",
    "Myagdi",
    "Lamjung",
    "Gorkha",
    "Parbat",
    "Pyuthan",
    "Rolpa",
    "Rukum East",
    "Rukum West",
    "Salyan",
    "Surkhet",
    "Kailali",
    "Kanchanpur",
    "Doti",
    "Dadeldhura",
    "Dharan",
    "Pokhara",
    "Nepalgunj",
  ];

  const [selectedDistricts, setSelectedDistricts] = useState({
    from: "",
    to: "",
    date: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  const status = useSelector((state) => state.getpath.status);
  const statusRoute = useSelector((state) => state.getpathrecent.status);
  const message = useSelector((state) => state.getpath.message);
  const error = useSelector((state) => state.getpath.error);
  const handleChangefrom = (e) => {
    setSelectedDistricts((prev) => ({ ...prev, from: e.target.value }));
  };

  const handleChangeto = (e) => {
    setSelectedDistricts((prev) => ({ ...prev, to: e.target.value }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    localStorage.removeItem("pathdata");
    localStorage.setItem("pathdata", JSON.stringify(selectedDistricts));
    setSubmit(true);
    await dispatch(getpathThunk(selectedDistricts));
  };

  useEffect(() => {
    if (submit && status === "success") {
      dispatch(resetStatus());
      navigate("/path");
    }
  }, [status, dispatch, message]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetStatus());
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [error]);

  if (submit && status === "success") {
    // prevent HeroSection from rendering right before navigate
    return null;
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Hero Section with Bus Park Background */}
      <div className="relative overflow-hidden text-white h-screen flex items-center">
        {/* Bus Park Background Image */}
        <img
          src={bus}
          alt="Bus Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Semi-transparent overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-blue-800/40 z-0"></div>

        {/* Floating Animation Elements */}
        <div className="absolute inset-0 overflow-hidden z-20">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            >
              <div className="w-2 h-2 bg-white rounded-full "></div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="relative max-w-7xl mx-auto px-4 py-12 pt-74 sm:px-6 lg:px-8 z-20 w-full lg:pt-0">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Book Your Perfect
              <span className="block text-orange-300 mt-2">Bus Journey</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover comfortable, affordable, and reliable bus travel with
              real-time booking and seat selection
            </p>

            {/* Enhanced Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
              <div className="bg-blue-900/30 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-orange-300 mb-2">
                  500+
                </div>
                <div className="text-blue-200 font-medium">Active Routes</div>
                <div className="text-sm text-blue-300 mt-1">Across Nepal</div>
              </div>
              <div className="bg-blue-900/30 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-orange-300 mb-2">
                  50K+
                </div>
                <div className="text-blue-200 font-medium">Happy Travelers</div>
                <div className="text-sm text-blue-300 mt-1">This Month</div>
              </div>
              <div className="bg-blue-900/30 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-orange-300 mb-2">
                  4.8★
                </div>
                <div className="text-blue-200 font-medium">User Rating</div>
                <div className="text-sm text-blue-300 mt-1">
                  Trusted Service
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2 text-blue-200">
                <Ticket className="h-5 w-5" />
                <span className="text-sm">Instant booking confirmation</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-200">
                <Clock className="h-5 w-5" />
                <span className="text-sm">24/7 customer support</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Form Section */}
      <div className="max-w-4xl mx-auto px-4 -mt-24 relative z-30">
        <div className="bg-white/90 rounded-2xl shadow-2xl border border-white p-6 md:p-8 backdrop-blur-sm">
          <form className="space-y-6" target="_self" onSubmit={handlesubmit}>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              <div className="md:col-span-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  From
                </label>
                <select
                  value={selectedDistricts.from}
                  onChange={handleChangefrom}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  required
                >
                  <option value="">Select departure city</option>
                  {districts.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-1 flex justify-center">
                <button
                  type="button"
                  className="p-3 text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 hover:scale-110"
                  onClick={() => {
                    // Swap From and To
                    setSelectedDistricts((prev) => ({
                      ...prev,
                      from: prev.to,
                      to: prev.from,
                    }));
                  }}
                >
                  <ArrowRightLeft className="h-5 w-5" />
                </button>
              </div>

              <div className="md:col-span-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  To
                </label>
                <select
                  value={selectedDistricts.to}
                  onChange={handleChangeto}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  required
                >
                  <option value="">Select destination city</option>
                  {districts.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Journey Date
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  onChange={(e) =>
                    setSelectedDistricts((prev) => ({
                      ...prev,
                      date: e.target.value,
                    }))
                  }
                  value={selectedDistricts.date}
                  required
                />
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button
                type="submit"
                disabled={status === "pending"} // ✅ Disable during loading
                className={`px-8 py-4 font-semibold rounded-xl shadow-lg transition-all duration-200 transform ${
                  status === "pending"
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 hover:scale-105"
                }`}
              >
                {status === "pending" ? (
                  <span className="flex items-center">
                    <Search className="inline h-5 w-5 mr-2 animate-spin" />
                    Searching...
                  </span>
                ) : (
                  <>
                    <Search className="inline h-5 w-5 mr-2" />
                    Search Buses
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Easy Booking
            </h3>
            <p className="text-gray-600">
              Find and book bus tickets in just a few clicks with our intuitive
              interface
            </p>
          </div>

          <div className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Live Tracking
            </h3>
            <p className="text-gray-600">
              Track your bus in real-time and get updates on arrival times
            </p>
          </div>

          <div className="text-center p-6 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Flexible Dates
            </h3>
            <p className="text-gray-600">
              Choose from multiple departure times and flexible booking options
            </p>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-20px) translateX(10px) rotate(5deg);
            opacity: 0.2;
          }
          100% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.1;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-fade-in {
          animation: fade-in 1.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default HeroSection;
