import React from "react";
import {
  Bus,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Star,
  Shield,
  Clock,
  CreditCard,
} from "lucide-react";
import logo from "../../assets/logo.png";
export default function Footer() {
  return (
    <footer className="bg-black text-white ">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center bg-white rounded-lg">
              <img
                src={logo}
                alt="Yatra Nepal logo"
                className="h-24 w-38 object-contain"
              />
              <div className="absolute ml-34">
                <h3 className="text-xl text-black font-bold"><span className="text-blue-500">यात्रा </span>Nepal</h3>
                <p className="text-black text-sm">Travel Made Easy</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Your trusted partner for comfortable and affordable bus travel
              across India. Book tickets online with ease and travel with
              confidence.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Twitter className="h-5 w-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {[
                "Book Tickets",
                "Cancel Booking",
                "Print Ticket",
                "Track Bus",
                "Bus Routes",
                "Offers & Deals",
                "Mobile App",
                "Help Center",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Routes */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Popular Routes</h4>
            <ul className="space-y-3">
              {[
                "kathmandu to surkhet",
                "Surkhet to kathmandu",
                "Nepalgunj to Kathmnadu",
                "Nepalgunj to Pokhara",
                "Nepalgunj to Hetauda",
                "Surkhet to Hetauda",
                "Dhangadhi to Kathmandu",
                "Mahendranagar to Pokhara",
              ].map((route) => (
                <li key={route}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {route}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-300">24/7 Customer Support</p>
                  <p className="text-white font-semibold">98602762.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-300">Email Support</p>
                  <p className="text-white font-semibold">PS6000146@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-gray-300">Head Office</p>
                  <p className="text-white font-semibold">
                  birendranagar-surkhet ,province-6
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors duration-200">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h5 className="font-semibold text-white">Secure Booking</h5>
                <p className="text-gray-400 text-sm">SSL Protected</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors duration-200">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h5 className="font-semibold text-white">24/7 Support</h5>
                <p className="text-gray-400 text-sm">Always Available</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors duration-200">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
              <div>
                <h5 className="font-semibold text-white">Best Prices</h5>
                <p className="text-gray-400 text-sm">Guaranteed</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors duration-200">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <div>
                <h5 className="font-semibold text-white">Easy Payment</h5>
                <p className="text-gray-400 text-sm">Multiple Options</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 text-sm">
                © 2024 यात्रा Nepal. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  Terms of Service
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  Cookie Policy
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Powered by</span>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                  <Bus className="h-3 w-3 text-white" />
                </div>
                <span className="text-white font-semibold text-sm">
                  यात्रा Nepal Technology
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-110 z-50 flex items-center justify-center"
        aria-label="Back to top"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </footer>
  );
}
