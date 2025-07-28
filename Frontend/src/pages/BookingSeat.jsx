import React, { useState, useEffect, useRef } from "react";
import { UserCheck, Eye, Printer } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getpathsoloThunk } from "../../features/booking/getpathdata/getpathsoloThunk";
import { useParams } from "react-router-dom";
import BusLoading from "../components/common/BusLoading";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import axios from 'axios'
export default function BookingSeat() {
  const [seatBook, setSeatBook] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const formRef = useRef(null);

  const dispatch = useDispatch();
  const path = useSelector((item) => item.getpathsolo.paths);
  const status = useSelector((item) => item.getpathsolo.status);
  const { busid } = useParams();

  useEffect(() => {
    dispatch(getpathsoloThunk(busid));
  }, [busid, dispatch]);

  const handleSelect = (seatNumber) => {
    if (seatBook.includes(seatNumber)) {
      setSeatBook((prev) => prev.filter((num) => num !== seatNumber));
      setTotalPrice((prev) => prev - parseInt(path.price));
    } else {
      if (seatBook.length < 6) {
        setSeatBook((prev) => [...prev, seatNumber]);
        setTotalPrice((prev) => prev + parseInt(path.price));
      } else {
        alert("Maximum 6 seats can be selected");
      }
    }
  };

  const [formData, setformData] = useState({
    amount: "",
    tax_amount: "0",
    total_amount: "",
    transaction_uuid: uuidv4(),
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST",
    success_url: `http://localhost:5173/successesewa/${busid}`,
    failure_url: "http://localhost:5173/failure",
    signed_field_names:
      "total_amount,transaction_uuid,product_code",
    signature: ""
  });

  console.log(formData)

  useEffect(() => {
    const getSignature=async()=>{
      const { transaction_uuid, product_code,} = formData;
    localStorage.setItem("selectedSeats", JSON.stringify(seatBook));
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/esewa/initiate`,{
      total_amount:totalPrice, transaction_uuid, product_code
    })
    setformData({ ...formData, signature: res.data.hashedSignature});
    }
      getSignature()
  }, [formData.amount,seatBook]);

  if (status === "pending") return <BusLoading />;

  const threeDview = () => toast.info("3D view coming soon");

  return (
    <div className="min-h-screen bg-[#f9fafb] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Select Your Seats
            </h1>
            <p className="text-sm text-gray-500">
              {path.Name} • {path.from} → {path.to}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="text-sm text-gray-700">
            Selected: {seatBook.length} seat(s)
          </div>
          <div className="text-lg sm:text-xl font-bold text-green-600">
            Rs.{totalPrice}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seat Layout */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-white border rounded"></div>
                <span className="text-sm text-gray-700">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-700">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-rose-100 rounded"></div>
                <span className="text-sm text-gray-700">Booked</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 mb-6">
              {/* A Side */}
              <div>
                <h4 className="text-center text-sm font-semibold text-gray-600 mb-2">
                  A Side
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {path?.seats
                    ?.slice(0, Math.floor(path.seats.length / 2))
                    .map((seat) => (
                      <button
                        key={seat._id}
                        disabled={seat.isBooked}
                        onClick={() => handleSelect(seat.seatNumber)}
                        className={`w-14 h-14 rounded border transition flex justify-center items-center text-sm font-medium ${
                          seat.isBooked
                            ? "bg-rose-100 opacity-50 cursor-not-allowed"
                            : seatBook.includes(seat.seatNumber)
                            ? "bg-green-500 text-white"
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
                <div className="grid grid-cols-2 gap-3">
                  {path?.seats
                    ?.slice(Math.floor(path.seats.length / 2))
                    .map((seat) => (
                      <button
                        key={seat._id}
                        disabled={seat.isBooked}
                        onClick={() => handleSelect(seat.seatNumber)}
                        className={`w-14 h-14 rounded border transition flex justify-center items-center text-sm font-medium ${
                          seat.isBooked
                            ? "bg-rose-100 opacity-50 cursor-not-allowed"
                            : seatBook.includes(seat.seatNumber)
                            ? "bg-green-500 text-white"
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

            <div className="flex justify-end">
              <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-md">
                <Printer className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-700">Driver</span>
              </div>
            </div>
          </div>
        </div>

        {/* Summary + Payment */}
        <div>
          <div className="bg-white rounded-xl shadow p-4 sm:p-6 sticky top-6">
            <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
            <div className="p-4 bg-blue-50 rounded-lg mb-4 text-sm">
              <div className="text-blue-900 font-semibold">{path.Name}</div>
              <div className="text-blue-700">{path.category}</div>
              <div className="text-blue-700">
                Phone Number: {path.phoneNumber || "9869048394"}
              </div>
              <div className="text-blue-600 mt-1">
                {path.timeFrom} - {path.timeTo}
              </div>
            </div>

            {seatBook.length > 0 && (
              <div className="mb-4 space-y-2 text-sm">
                {seatBook.map((s, index) => (
                  <div key={index} className="flex justify-between">
                    <span>Seat {s}</span>
                    <span>₹{path.price}</span>
                  </div>
                ))}
              </div>
            )}

            <hr className="my-3" />

            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span className="text-green-600">Rs.{totalPrice || 0}</span>
            </div>

            <form
              action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
              method="POST"
              className="space-y-2"
            >
              <input type="hidden" name="tax_amount" value={formData.tax_amount} />
              <input type="hidden" name="total_amount" value={formData.total_amount} />
              <input type="hidden" name="product_delivery_charge" value={formData.product_delivery_charge} />
              <input type="hidden" name="product_service_charge" value={formData.product_service_charge} />
              <input type="hidden" name="product_code" value={formData.product_code} />
              <input type="hidden" name="transaction_uuid" value={formData.transaction_uuid} />
              <input type="hidden" name="success_url" value={formData.success_url} />
              <input type="hidden" name="failure_url" value={formData.failure_url} />
              <input type="hidden" name="signed_field_names" value={formData.signed_field_names} />
              <input type="hidden" name="signature" value={formData.signature} />
              <input type="text" name="amount" className="border pl-2" value={formData.amount} placeholder="Enter the amount" onChange={({ target }) =>
            setformData({
              ...formData,
              amount: target.value,
              total_amount: target.value,
            })
          } />
             <button
  type="submit"
  disabled={seatBook.length === 0 || formData.amount === ""}
  className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
>
  Pay with eSewa
</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
