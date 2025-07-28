import React, { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SuccessEsewa = () => {
  const [params] = useSearchParams();
  const { busid } = useParams();
  const [status, setStatus] = useState("🔄 Verifying your payment...");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyPayment = async () => {
      const encodedData = params.get("data");
      const seats = JSON.parse(localStorage.getItem("selectedSeats") || "[]");

      if (!encodedData || !busid) {
        setStatus("⚠️ Missing required payment data.");
        return;
      }

      try {
        // Decode the base64-encoded JSON string from eSewa
        const decodedJson = atob(encodedData);
        const paymentData = JSON.parse(decodedJson);
        console.log(paymentData);

        const {
          total_amount,
          transaction_code,
          transaction_uuid,
          status: paymentStatus,
        } = paymentData;

        if (!transaction_code || !transaction_uuid || !total_amount) {
          setStatus("❌ Invalid payment details.");
          return;
        }

        // Send data to backend for verification and seat booking
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/esewa/verify`,
          {
            busid,
            seats,
            amount: total_amount,
            refId: transaction_uuid,
            transactionCode: transaction_code,
            paymentStatus,
          },
          { withCredentials: true }
        );

        if (res.data.verified) {
          setStatus("✅ Payment Verified Successfully!");
          setIsSuccess(true);
        } else {
          setStatus("❌ Payment could not be verified.");
        }
      } catch (err) {
        console.error("Error verifying payment:", err);
        setStatus("❌ An error occurred while verifying the payment.");
      }
    };

    verifyPayment();
  }, [params, busid]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-100 to-green-200 text-center px-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-700 mb-4">
          Payment Status
        </h1>
        <p
          className={`text-lg mb-6 ${
            isSuccess ? "text-green-600" : "text-red-600"
          }`}
        >
          {status}
        </p>

        {/* ✅ Go Home Button */}
        <button
          onClick={() => navigate("/")}
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default SuccessEsewa;
