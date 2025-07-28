import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Star, User, Clock } from "lucide-react";
import { getpathThunk } from "../../features/booking/getpathdata/getpathThunk";
import { resetStatus } from "../../features/booking/getpathdata/getpathSlice";
import RatingModel from "../components/Bus/RatingModel";
import BusLoading from "../components/common/BusLoading";


const Path = () => {
  const paths = useSelector((state) => state.getpath.paths);
  const status = useSelector((state) => state.getpath.status);
  const userid = useSelector((state) => state.getpath.userid);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [busName, setBusName] = useState("");
  const [busId, setBusId] = useState("");
  const [showAllReviews, setShowAllReviews] = useState(false);

  const REVIEW_LIMIT = 3;

  const renderStars = (rating) => (
    <div className="flex text-yellow-400">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          fill={i < rating ? "#facc15" : "none"}
          stroke="#facc15"
        />
      ))}
    </div>
  );

  useEffect(() => {
    const data = localStorage.getItem("pathdata");
    if (!data) return;
    const pathdata = JSON.parse(data);
    dispatch(getpathThunk(pathdata));
    dispatch(resetStatus());
  }, [dispatch]);

  const handleCancel = () => setShow(false);

  const handlemodal = (name, busid) => {
    setBusName(name);
    setBusId(busid);
    setShow(true);
  };

 
  return (
    <div className="min-h-screen px-4 lg:px-20 bg-gray-50">
      {paths.length > 0 && (
        <div className="min-h-screen py-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Available Buses</h1>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            {paths[0].from} → {paths[0].to} • {paths[0].date}
          </p>

          {paths.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-4 sm:p-6 mb-6 w-full"
            >
              <div className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-6">
                <div className="flex-1">
                  <h2 className="text-lg sm:text-xl font-bold">
                    {item.Name || "Unknown Bus"}
                  </h2>
                  <p className="text-sm text-gray-500 mb-1">{item.category}</p>
                  <div className="flex items-center gap-2">
                    {renderStars(
                      Math.round(
                        item.rate.length > 0
                          ? item.rate.reduce((acc, cur) => acc + (cur.rating || 0), 0) /
                              item.rate.length
                          : 0
                      )
                    )}
                    <span className="text-sm text-gray-600">
                      {item.rate.length > 0
                        ? (
                            item.rate.reduce((acc, cur) => acc + (cur.rating || 0), 0) /
                            item.rate.length
                          ).toFixed(1)
                        : "0.0"}{" "}
                      ({item.rate.length} reviews)
                    </span>
                  </div>

                  {/* Rate Button or Rated Message */}
                  {item.rate.some((r) => r.userid === userid) ? (
                    <p className="mt-2 text-green-600 text-sm font-semibold">
                      You rated this bus
                    </p>
                  ) : (
                    <button
                      onClick={() => handlemodal(item.Name, item._id)}
                      className="mt-2 text-sm text-blue-600 border border-blue-600 px-3 py-1 rounded-full"
                    >
                      Rate this bus
                    </button>
                  )}

                  {/* Bus Images */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                    {item.images?.map((img, i) => (
                      <a
                        key={i}
                        href={img}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <img
                          src={img}
                          alt={`Bus ${i + 1}`}
                          className="rounded-lg object-cover h-40 w-full shadow-sm transition-transform duration-200 hover:scale-105"
                        />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Time and Route Info */}
                <div className="flex flex-col text-center w-full sm:w-auto">
                  <p className="text-lg font-semibold">{item.timeFrom}</p>
                  <p className="text-sm text-gray-500">{item.from}</p>
                </div>

                  <p className="text-sm text-gray-500 text-center"> {item.timetravel} </p>

                <div className="flex flex-col text-center w-full sm:w-auto">
                  <p className="text-lg font-semibold">{item.timeTo}</p>
                  <p className="text-sm text-gray-500">{item.to}</p>
                </div>

                {/* Facilities and Pricing */}
                <div className="flex flex-col text-right w-full sm:w-auto">
                  <div className="flex flex-wrap gap-2 justify-end">
                    {item.facilities.length > 0 &&
                      Object.entries(item.facilities[0]).map(
                        ([key, value], idx) =>
                          key !== "_id" &&
                          value && (
                            <span
                              key={idx}
                              className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full"
                            >
                              {key}
                            </span>
                          )
                      )}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    {item.seatempty} seats available
                  </p>
                </div>

                <div className="text-right w-full sm:w-auto">
                  <p className="text-2xl font-bold">₹{item.price}</p>
                  <p className="text-sm text-gray-500">per seat</p>
                  <button
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full sm:w-auto"
                    onClick={() => navigate(`/bookseat/${item._id}`)}
                  >
                    Select Seats
                  </button>
                </div>
              </div>

              {/* Reviews */}
              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between items-center mb-3">
                  <p className="font-semibold">Reviews ({item.rate.length})</p>
                  {item.rate.length > REVIEW_LIMIT && (
                    <button
                      className="text-blue-600 text-sm"
                      onClick={() => setShowAllReviews(!showAllReviews)}
                    >
                      {showAllReviews ? "Show Less" : "View All Reviews"}
                    </button>
                  )}
                </div>

                {(showAllReviews ? item.rate : item.rate.slice(0, REVIEW_LIMIT)).map(
                  (review, idx) => (
                    <div key={idx} className="flex items-start gap-3 mb-4">
                      <User className="h-8 w-8 text-blue-500 mt-1" />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-medium">{review.username}</span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 rounded-full">
                            Verified
                          </span>
                          <span className="text-sm text-gray-500">
                            {review.date &&
                              new Date(review.date).toLocaleDateString()}
                          </span>
                        </div>
                        {renderStars(review.rating)}
                        <p className="text-sm mt-1 text-gray-700">{review.review}</p>
                      </div>
                    </div>
                  )
                )}

                {show && (
                  <RatingModel
                    busName={busName}
                    onClose={handleCancel}
                    busid={busId}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Buses Found */}
      {status === "success" && paths.length === 0 && (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-48">
          <div className="text-center">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-16 w-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Routes Found</h2>
            <p className="text-gray-600 mb-4">Sorry, no buses available</p>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search Different Route
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Path;
