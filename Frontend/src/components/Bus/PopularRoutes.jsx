import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { getpathrecentThunk } from '../../../features/booking/getpathdata/getrecentpath/getrecentpathThunk';
import { useNavigate } from 'react-router-dom';

const PopularRoutes = () => {
  const dispatch = useDispatch();
  const [showAll, setShowAll] = useState(false); // State to toggle view
  const paths = useSelector((state) => state.getpathrecent.paths);
  const status = useSelector((state) => state.getpathrecent.status);
  const navigate =useNavigate()
  useEffect(() => {
    dispatch(getpathrecentThunk());
  }, [dispatch]);

  if (status === 'pending') {
    return <div>Loading...</div>;
  }

  const visiblePaths = showAll ? paths : paths.slice(0, 4); // Limit initial display to 4

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Recent Routes</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Discover our most popular bus routes with thousands of satisfied travelers every month
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visiblePaths.map((route) => (
            <div
              key={route._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      {route.from} → {route.to}
                    </h3>
                    <div className="flex items-center mt-1">
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-sm font-medium text-gray-600">
                          {route.rate.length > 0
                            ? (
                                route.rate.reduce((acc, cur) => acc + (cur.rating || 0), 0) /
                                route.rate.length
                              ).toFixed(1)
                            : '0'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center mt-3 text-gray-600">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full border border-gray-400 mr-2 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                    </div>
                    <span className="text-sm">{route.timetravel}</span>
                  </div>
                </div>
                 <h1 className='text-gray-500 mt-1'>Date : {route.date}</h1>
                <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100">
                  <div className="text-xl font-bold text-blue-600">Rs.{route.price}</div>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-200" onClick={()=>navigate(`/bookseat/${route._id}`)}>
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {paths.length > 4 && (
          <div className="text-center mt-10">
            <button
              className="px-6 py-3 bg-white border border-blue-500 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors duration-200"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : 'View All Routes'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularRoutes;
