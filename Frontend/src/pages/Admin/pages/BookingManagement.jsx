import React, { useEffect, useState } from 'react';
import { MapPin, Calendar, Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
const[loadingStatusAccept,setLoadingStatusAccept]=useState(false)
const[loadingStatusReject,setLoadingStatusReject]=useState(false)
  useEffect(() => {
    fetchBookings();
  }, []);

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/getbookedpathAdmin`, {
          withCredentials: true,
        });
        const paths = response.data.activePaths || [];
        console.log(paths)
        setBookings(paths)
      } catch (err) {
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };

const handleAccept = async (id, status = 'ACCEPTED') => {
  setLoadingStatusAccept(true);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/setstatus`,
      { status, bookingid: id },
      { withCredentials: true }
    );
    if(response.status === 200){
      fetchBookings()
       toast.success(response.data.message)
    }
  } catch (err) {
    console.error('Error updating booking status:', err);
  } finally {
    setLoadingStatusAccept(false);
  }
};


  const handleReject =async (id, status = 'REJECTED') => {
  setLoadingStatusReject(true);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/setstatus`,
      { status, bookingid: id },
      { withCredentials: true }
    );
    if(response.status === 200){
      fetchBookings()
      toast.success(response.data.message)
    }
  } catch (err) {
    console.error('Error updating booking status:', err);
  } finally {
    setLoadingStatusReject(false);
  }
  };

    if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-10 h-10 text-green-600 animate-spin" />
        <span className="ml-3 text-lg text-gray-600">Loading Booking...</span>
      </div>
    );
  }


return (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Management</h1>
    <p className="text-gray-600 mb-6">Live customer bookings</p>

    {bookings.length === 0 ? (
      <div className="text-center text-gray-600 text-lg mt-10">
        No bookings available yet.
      </div>
    ) : (
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="relative bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-lg font-bold text-gray-900">{booking.Name}</p>
                  <p className="text-sm text-gray-600">{booking.email}</p>
                  <p className="text-sm text-gray-900">phone: {booking.phoneNumber}</p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    booking.paymentStatus === 'PAID'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {booking?.paymentStatus}
                </span>
              </div>

              <div className="relative mb-4">
                <img
                  src={booking?.bus.images?.[0]}
                  alt={booking?.bus.Name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-xs font-medium">
                  {booking.bus.plateNumber}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <p className="font-medium text-gray-900">{booking.bus.Name}</p>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>
                    {booking.bus.from} → {booking.bus.to}
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{new Date(booking.bus.date).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Seats:</p>
                <div className="flex flex-wrap gap-1">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                    {booking.seatNumber}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4 pt-4 border-t border-gray-200">
                <span className="text-sm text-gray-600">Total Amount:</span>
                <span className="text-lg font-bold text-green-600">
                  Rs. {booking.amount}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <button
                  onClick={() => handleAccept(booking._id)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 rounded-lg transition disabled:bg-green-400"
                  disabled={loadingStatusAccept}
                >
                  Accept
                </button>
                <button
                  onClick={() => handleReject(booking._id)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 rounded-lg transition disabled:bg-red-400"
                  disabled={loadingStatusReject}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

};

export default BookingManagement;
