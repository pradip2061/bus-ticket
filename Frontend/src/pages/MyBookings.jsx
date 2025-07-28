import React, { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Clock, User, X, Loader2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function MyBookings() {
  const [bookedTickets, setBookedTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const getbookedpath = async () => {
      try {
        setLoading(true); // ✅ Start loading
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/getbookedpath`,
          { withCredentials: true }
        );
        setBookedTickets(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false); // ✅ Stop loading
      }
    };

    getbookedpath();
  }, []);

  const filtered = bookedTickets.filter((t) =>
    filterStatus === "all" ? true : t.paymentStatus === filterStatus
  );

  return (
    <div className="p-4">
      <button
        onClick={() => navigate("/")}
        className="mb-4 flex items-center text-blue-600"
      >
        <ArrowLeft className="mr-2" /> Back
      </button>

      <h1 className="text-2xl font-bold mb-4">My Bookings</h1>

      {/* Filters */}
      <div className="mb-4 flex gap-2 flex-wrap">
        {["all", "PAID", "REJECTED", "ACCEPTED"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded ${
              filterStatus === status ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* ✅ Loading Indicator */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
          <span className="ml-2 text-blue-600">Loading your bookings...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div>No tickets found.</div>
      ) : (
        filtered.map((ticket) => (
          <div
            key={ticket._id}
            className="border p-4 rounded mb-4 bg-white shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-bold">
                {ticket.bus?.category || "Unknown Bus"}
              </h2>
              <p
                className={`${
                  ticket.paymentStatus === "ACCEPTED"
                    ? "text-green-500"
                    : ticket.paymentStatus === "REJECTED"
                    ? "text-red-500"
                    : "text-gray-600"
                }`}
              >
                {ticket.paymentStatus}
              </p>
            </div>
            <div className="text-sm mb-1">
              <strong>Route:</strong> {ticket.bus?.from} → {ticket.bus?.to}
            </div>
            <div className="text-sm mb-1">
              <Calendar className="inline h-4 w-4 mr-1" />
              {new Date(ticket.bus?.date).toLocaleDateString()}
            </div>
            <div className="text-sm mb-1">
              <User className="inline h-4 w-4 mr-1" />
              Seats: {ticket.seatNumber.join(", ")}
            </div>
            <div className="text-sm mb-1">
              <Clock className="inline h-4 w-4 mr-1" />
              {ticket.bus?.timeFrom} → {ticket.bus?.timeTo} (
              {ticket.bus?.timetravel})
            </div>
            <div className="text-sm font-bold mb-2">
              Total: ₹{ticket.amount}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedTicket(ticket)}
                className="px-4 py-1 bg-blue-500 text-white rounded"
              >
                View
              </button>
            </div>
          </div>
        ))
      )}

      {/* Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded w-full max-w-lg max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-xl">Ticket Details</h2>
              <button onClick={() => setSelectedTicket(null)}>
                <X />
              </button>
            </div>

            {/* Bus Images Grid */}
            {selectedTicket.bus?.images?.length > 0 && (
              <div className="mb-4 grid grid-cols-2 gap-2">
                {selectedTicket.bus.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Bus image ${idx + 1}`}
                    loading="lazy"
                    className="w-full h-40 object-cover rounded"
                  />
                ))}
              </div>
            )}

            <div className="space-y-2 text-sm">
              <p>
                <strong>Operator:</strong> {selectedTicket.bus?.category}
              </p>
              <p>
                <strong>Route:</strong> {selectedTicket.bus?.from} →{" "}
                {selectedTicket.bus?.to}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedTicket.bus?.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {selectedTicket.bus?.timeFrom} →{" "}
                {selectedTicket.bus?.timeTo}
              </p>
              <p>
                <strong>PhoneNumber:</strong> {selectedTicket.phoneNumber}
              </p>
              <p>
                <strong>Seats:</strong> {selectedTicket.seatNumber.join(", ")}
              </p>
              <p
                className={`${
                  selectedTicket.paymentStatus === "ACCEPTED"
                    ? "text-green-500"
                    : selectedTicket.paymentStatus === "REJECTED"
                    ? "text-red-500"
                    : "text-gray-600"
                }`}
              >
                <strong>Status:</strong> {selectedTicket.paymentStatus}
              </p>
              <p>
                <strong>Total:</strong> ₹{selectedTicket.amount}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
