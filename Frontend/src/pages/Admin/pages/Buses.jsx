import React, { useState, useEffect } from "react";
import { Bus, Eye, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Buses = () => {
  const [viewMode, setViewMode] = useState("list");
  const [loading, setLoading] = useState(false);
  const [buses, setBuses] = useState([]); // to store fetched data
  const navigate = useNavigate();

  const getPathOperator = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/getpathoperator`,
        { withCredentials: true }
      );
      // Assuming API returns an array of buses in response.data.paths
      setBuses(response.data.paths || []);
    } catch (err) {
      console.error("Error fetching paths:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPathOperator();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-600">
        Loading buses...
      </div>
    );
  }

  if (viewMode === "seats") {
    return (
      <div className="p-8">
        <button
          onClick={() => setViewMode("list")}
          className="text-blue-600 hover:text-blue-800 font-medium mb-4"
        >
          ← Back to Fleet
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Seat Management
        </h1>
        <p className="text-gray-600">
          Manage seat availability and view passenger details.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Fleet Management</h1>
        <p className="text-gray-600">
          Manage your bus fleet, view capacity, and monitor real-time status.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {buses.length === 0 ? (
          <p className="text-gray-500">No buses available.</p>
        ) : (
          buses.map((bus, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-100 rounded-lg p-2">
                      <Bus className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{bus.Name || "Unnamed Bus"}</h3>
                      <p className="text-sm text-gray-600">{bus.plateNumber || "N/A"}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Type</span>
                    <span className="text-sm font-medium text-gray-900">
                      {bus.category || "Unknown"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Capacity</span>
                    <span className="text-sm font-medium text-gray-900">
                      {bus.totalseat || 0} seats
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Current Route</span>
                    <span className="text-sm font-medium text-gray-900">
                      {bus.from || "N/A"}-{bus.to}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => navigate(`/viewseat/${bus._id}`)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Seats</span>
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    <Settings className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Buses;
