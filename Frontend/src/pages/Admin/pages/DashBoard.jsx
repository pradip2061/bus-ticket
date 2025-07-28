import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bus, Users, TrendingUp, CheckCircle } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBuses: 0,
    activeBuses: 0,
    todayBookings: 0,
    bookingTrend: "0%",
    activeBusList: [],
  });
  const [loading, setLoading] = useState(true); // ✅ Default true

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/getadmin`,
        { withCredentials: true }
      );
      if (response.data) {
        setStats(response.data);
      }
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false); // ✅ Set loading false after fetch
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white text-gray-600">
        <p className="text-lg font-semibold">Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white min-h-screen text-black">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard Overview</h1>
        <p className="text-gray-600">
          Welcome back! Here's the latest update on your fleet.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Fleet */}
        <div className="bg-white border border-gray-200 rounded-xl shadow p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-600 rounded-lg p-3">
              <Bus className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold mb-1">{stats.totalBuses}</h3>
          <p className="text-gray-800 font-medium mb-2">Total Fleet</p>
          <p className="text-sm text-blue-600">+2 this month</p>
        </div>

        {/* Active Buses */}
        <div className="bg-white border border-gray-200 rounded-xl shadow p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-600 rounded-lg p-3">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold mb-1">{stats.activeBuses}</h3>
          <p className="text-gray-800 font-medium mb-2">Active Buses</p>
          <p className="text-sm text-blue-600">
            {stats.activeBuses}/{stats.totalBuses} operational
          </p>
        </div>

        {/* Today's Bookings */}
        <div className="bg-white border border-gray-200 rounded-xl shadow p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-600 rounded-lg p-3">
              <Users className="w-6 h-6 text-white" />
            </div>
            <TrendingUp className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold mb-1">{stats.todayBookings}</h3>
          <p className="text-gray-800 font-medium mb-2">Today's Bookings</p>
          <p className="text-sm text-blue-600">{stats.bookingTrend}</p>
        </div>
      </div>

      {/* Active Bus List Section */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        <h2 className="text-xl font-bold mb-6">Active Buses</h2>
        <div
          className="space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100"
          style={{
            maxHeight: "400px",
            paddingRight: "8px",
          }}
        >
          {stats.activeBusList.length === 0 ? (
            <p className="text-gray-500 text-center">
              No active buses available
            </p>
          ) : (
            stats.activeBusList.map((bus) => (
              <div
                key={bus._id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  <div>
                    <p className="font-medium">{bus.Name}</p>
                    <p className="text-sm text-gray-600">
                      {bus.from} • {bus.to || "No route assigned"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{bus.status}</p>
                  <p className="text-xs text-gray-600">
                    {bus.seats ? bus.seats.filter((s) => s.isBooked).length : 0}/
                    {bus.totalseat} occupied
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
