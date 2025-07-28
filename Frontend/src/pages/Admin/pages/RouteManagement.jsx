import React, { useEffect, useState } from "react";
import {
  Route,
  MapPin,
  Clock,
  Edit,
  Trash2,
  ToggleLeft,
  ToggleRight,
  Loader2,
  Calendar,
} from "lucide-react";
import axios from "axios";

const RouteManagement = () => {
  const [paths, setPaths] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [deleteLoadingId, setDeleteLoadingId] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showEditForm, setShowEditForm] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);
  const [formValues, setFormValues] = useState({
    Name: "",
    from: "",
    to: "",
    price: "",
    timetravel: "",
    date: "",
  });

  const getPathOperator = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/getpathoperator`,
        { withCredentials: true }
      );
      setPaths(response.data.paths);
    } catch (err) {
      console.error("Error fetching paths:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPathOperator();
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    try {
      setLoadingId(id);
      const newStatus = currentStatus === "active" ? "inactive" : "active";

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/setstatuspath`,
        { id, status: newStatus },
        { withCredentials: true }
      );

      getPathOperator();
    } catch (err) {
      console.error("Error toggling status:", err);
    } finally {
      setLoadingId(null);
    }
  };

  const deletePath = async (id) => {
    try {
      setDeleteLoadingId(id);
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/deletepath`,
        { id },
        { withCredentials: true }
      );
      getPathOperator();
    } catch (err) {
      console.error("Error deleting path:", err);
    } finally {
      setDeleteLoadingId(null);
    }
  };

  const handleEditClick = (route) => {
    setEditingRoute(route);
    setFormValues({
      Name: route.Name,
      from: route.from,
      to: route.to,
      price: route.price,
      timetravel: route.timetravel,
      date: route.date,
    });
    setShowEditForm(true);
  };

  const handleFormChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/updatepath`,
        {formValues,busid:editingRoute._id},
        { withCredentials: true }
      );
      setShowEditForm(false);
      setPaths([])
      getPathOperator();
    } catch (err) {
      console.error("Error updating route:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <Loader2 className="w-10 h-10 text-green-600 animate-spin mb-2" />
        <span className="text-lg text-gray-600">Loading routes...</span>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Routes & Paths Management</h1>
      </div>

      {/* Routes List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {paths.map((route) => (
          <div
            key={route._id}
            className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold">{route.Name}</h3>
                <p className="text-gray-600 text-sm">
                  {route.from} → {route.to}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleStatus(route._id, route.status)}
                  className="p-1 rounded hover:bg-gray-100"
                  disabled={loadingId === route._id}
                >
                  {loadingId === route._id ? (
                    <Loader2 className="w-6 h-6 text-green-500 animate-spin" />
                  ) : route.status === "active" ? (
                    <ToggleRight className="w-6 h-6 text-green-500" />
                  ) : (
                    <ToggleLeft className="w-6 h-6 text-gray-400" />
                  )}
                </button>
                <button
                  onClick={() => handleEditClick(route)}
                  className="p-1 text-blue-600 hover:bg-gray-100 rounded"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => deletePath(route._id)}
                  className="p-1 text-red-600 hover:bg-gray-100 rounded"
                  disabled={deleteLoadingId === route._id}
                >
                  {deleteLoadingId === route._id ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Trash2 className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="text-sm space-y-1">
              <p>
                <Clock className="inline w-4 h-4 mr-1 text-gray-500" />
                Duration: {route.timetravel}
              </p>
              <p>
                Price: Rs. {route.price}
              </p>
              <p>
                <Calendar className="inline w-4 h-4 mr-1 text-gray-500" />
                Date: {route.date}
              </p>
            </div>
            {/* Active/Inactive Badge */}
            <div className="mt-4">
              <span
                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                  route.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {route.status === "active" ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* No Routes */}
      {paths.length === 0 && (
        <div className="text-center py-12">
          <Route className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium">No routes found</h3>
          <p className="text-gray-600 text-sm">
            Create your first bus route to get started.
          </p>
        </div>
      )}

      {/* Edit Form Modal */}
      {showEditForm && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Update Route</h2>
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <input
                type="text"
                name="Name"
                value={formValues.Name}
                onChange={handleFormChange}
                placeholder="Name"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="from"
                value={formValues.from}
                onChange={handleFormChange}
                placeholder="From"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="to"
                value={formValues.to}
                onChange={handleFormChange}
                placeholder="To"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="timetravel"
                value={formValues.timetravel}
                onChange={handleFormChange}
                placeholder="Duration"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="price"
                value={formValues.price}
                onChange={handleFormChange}
                placeholder="Price"
                className="w-full border p-2 rounded"
              />
              <input
                type="date"
                name="date"
                value={formValues.date}
                onChange={handleFormChange}
                className="w-full border p-2 rounded"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setShowEditForm(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteManagement;
 