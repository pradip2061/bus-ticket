import React from "react";
import { useNavigate } from "react-router-dom";

const Failure = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-red-100 to-red-200 text-center px-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-red-700 mb-4">
          Payment Failed ❌
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          Your payment was not completed. Please try again or contact support.
        </p>

        {/* Retry or Go Home Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex-1 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition"
          >
            Go to Home
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex-1 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          >
            Retry Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Failure;
