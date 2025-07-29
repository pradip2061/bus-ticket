import React, { useState, useEffect } from "react";
import { UserCheck, Printer, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function ViewSeats() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);

  const getPathSeats = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/getpathsolo`,
        { params: { busid: id } }
      );
      if (response.status === 200 && response.data.businfo) {
        setSeats(response.data.businfo.seats);
      } else {
        toast.error("No seats found for this bus.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching seats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPathSeats();
  }, [id]);

  const aSideSeats =
    seats.filter((seat) => seat.side === "A").length > 0
      ? seats.filter((seat) => seat.side === "A")
      : seats.slice(0, Math.ceil(seats.length / 2));
  const bSideSeats =
    seats.filter((seat) => seat.side === "B").length > 0
      ? seats.filter((seat) => seat.side === "B")
      : seats.slice(Math.ceil(seats.length / 2));

  const handleSeatClick = (seat) => {
    setSelectedSeat(seat);
    setModalOpen(true);
  };

  const confirmAction = async () => {
    if (!selectedSeat) return;
    try {
      const newStatus = !selectedSeat.isBooked;
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/updateSeatStatus`,
        {
          busid: id,
          seatId: selectedSeat._id,
          isBooked: newStatus,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        toast.success(
          `Seat ${selectedSeat.seatNumber} ${
            newStatus ? "booked" : "unbooked"
          } successfully!`
        );
        setSeats((prevSeats) =>
          prevSeats.map((s) =>
            s._id === selectedSeat._id ? { ...s, isBooked: newStatus } : s
          )
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update seat");
    } finally {
      setModalOpen(false);
      setSelectedSeat(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading seats...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] p-4 sm:p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Buses
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Manage Seats
        </h1>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seat Layout */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow">
            {/* Legends */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-white border rounded"></div>
                <span className="text-sm text-gray-700">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-rose-100 rounded"></div>
                <span className="text-sm text-gray-700">Booked</span>
              </div>
            </div>

            {/* Seat Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
              {/* A Side */}
              <div>
                <h4 className="text-center text-sm font-semibold text-gray-600 mb-2">
                  A Side
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {aSideSeats.map((seat) => (
                    <button
                      key={seat._id}
                      onClick={() => handleSeatClick(seat)}
                      className={`aspect-square w-full max-w-[3.5rem] sm:max-w-[4rem] rounded border transition flex justify-center items-center text-sm font-medium ${
                        seat.isBooked
                          ? "bg-rose-100 border-red-400"
                          : "bg-white hover:bg-blue-100 border-blue-300"
                      }`}
                    >
                      {seat.isBooked ? (
                        <UserCheck className="w-4 h-4" />
                      ) : (
                        seat.seatNumber
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* B Side */}
              <div>
                <h4 className="text-center text-sm font-semibold text-gray-600 mb-2">
                  B Side
                </h4>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {bSideSeats.map((seat) => (
                    <button
                      key={seat._id}
                      onClick={() => handleSeatClick(seat)}
                      className={`aspect-square w-full max-w-[3.5rem] sm:max-w-[4rem] rounded border transition flex justify-center items-center text-sm font-medium ${
                        seat.isBooked
                          ? "bg-rose-100 border-red-400"
                          : "bg-white hover:bg-blue-100 border-blue-300"
                      }`}
                    >
                      {seat.isBooked ? (
                        <UserCheck className="w-4 h-4" />
                      ) : (
                        seat.seatNumber
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Driver */}
            <div className="flex justify-end">
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-md">
                <Printer className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-700">Driver</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && selectedSeat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-gray-800">
              {selectedSeat.isBooked ? "Unbook Seat" : "Book Seat"}
            </h2>
            <p className="text-gray-600 mb-6">
              Seat Number:{" "}
              <span className="font-semibold">{selectedSeat.seatNumber}</span>
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                className={`px-4 py-2 rounded text-white ${
                  selectedSeat.isBooked
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {selectedSeat.isBooked ? "Unbook" : "Book"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
