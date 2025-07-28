import React from 'react';
import { X } from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, isOpen, setIsOpen }) => {
  const menuItems = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'buses', label: 'Buses' },
    { key: 'routes', label: 'Routes' },
    { key: 'create-bus', label: 'Create Bus' },
    { key: 'bookings', label: 'Bookings' },
  ];

  return (
    <aside
      className={`bg-white shadow-md z-50 lg:z-20 w-64 h-screen
      md:static md:translate-x-0 fixed top-0 left-0 transform transition-transform duration-300
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:block`}
    >
      {/* Mobile Header */}
      <div className="flex justify-between items-center p-4 md:hidden border-b">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button onClick={() => setIsOpen(false)}>
          <X className="w-6 h-6 text-gray-700" />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setActiveTab(item.key);
              setIsOpen(false); // Close sidebar on mobile after selecting
            }}
            className={`block w-full text-left px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100
              ${activeTab === item.key ? 'bg-gray-200 font-bold' : ''}`}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
