import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetdataLogin } from '../../../features/auth/login/LoginSlice';
import DashBoard from './pages/DashBoard';
import CreateBus from './pages/CreateBus';
import Sidebar from './components/Sidebar';
import BookingManagement from './pages/BookingManagement';
import RouteManagement from './pages/RouteManagement';
import { Menu } from 'lucide-react'; // For hamburger icon
import { logoutThunk } from '../../../features/auth/logout/LogoutThunk';
import { resetdataLogout } from '../../../features/auth/logout/LogoutSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from "../../assets/logo.png";
import Buses from './pages/Buses';

const AdminDashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const status = useSelector((state) => state.logout.status);
  const message = useSelector((state) => state.logout.message);
  const error = useSelector((state) => state.logout.error);

  useEffect(() => {
    dispatch(resetdataLogin());
  }, [dispatch]);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashBoard />;
      case 'buses':
        return <Buses/>
      case 'routes':
        return <RouteManagement />;
      case 'create-bus':
        return <CreateBus />;
      case 'bookings':
        return <BookingManagement />;
      default:
        return <DashBoard />;
    }
  };

  const handleLogout = async () => {
    try {
      dispatch(logoutThunk());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (message) {
      dispatch(resetdataLogout());
      toast.info(message);
      navigate('/', { replace: true });
    } else if (error) {
      toast.error(error);
    }
  }, [message, error, dispatch, navigate]);

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center h-16 px-4 lg:px-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-10 w-auto" />
            <span className="text-xl font-bold text-blue-500">यात्रा Nepal</span>
          </div>

          {/* Desktop Logout */}
          {localStorage.getItem('isLogin') && (
            <button
              className="hidden md:block px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition disabled:opacity-50"
              onClick={handleLogout}
              disabled={status === 'pending'}
            >
              {status === 'pending' ? 'Logging out...' : 'Logout'}
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 bg-white rounded-md shadow-md"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </header>

      {/* Layout */}
      <div className="flex min-h-screen bg-gray-50 relative">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            setIsSidebarOpen(false);
          }}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />

        {/* Backdrop for Mobile */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">{renderContent()}</main>
      </div>
    </>
  );
};

export default AdminDashBoard;
