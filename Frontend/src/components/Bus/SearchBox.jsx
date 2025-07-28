import { ArrowRightLeft, Calendar, MapPin, Search } from 'lucide-react';
import React, { useState } from 'react'

const SearchBox = () => {
      const [searchForm, setSearchForm] = useState({
  });

const cities=['jaipur','kathmandu']

  const handleSearch = (e) => {
    e.preventDefault();
  };
  return (
       <div className="max-w-4xl mx-auto px-4 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 md:p-8 backdrop-blur-sm">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              {/* From City */}
              <div className="md:col-span-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  From
                </label>
                <select
                  value={searchForm.from}
                  onChange={(e) => setSearchForm(prev => ({ ...prev, from: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  required
                >
                  <option value="">Select departure city</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <div className="md:col-span-1 flex justify-center">
                <button
                  type="button"
                  className="p-3 text-blue-600 hover:bg-blue-50 rounded-full transition-all duration-200 hover:scale-110"
                >
                  <ArrowRightLeft className="h-5 w-5" />
                </button>
              </div>

              {/* To City */}
              <div className="md:col-span-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  To
                </label>
                <select
                  value={searchForm.to}
                  onChange={(e) => setSearchForm(prev => ({ ...prev, to: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
                  required
                >
                  <option value="">Select destination city</option>
                  {cities.filter(city => city !== searchForm.from).map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div className="md:col-span-3">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Journey Date
                </label>
                <input
                  type="date"
                  value={searchForm.date}
                  onChange={(e) => setSearchForm(prev => ({ ...prev, date: e.target.value }))}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                <Search className="inline h-5 w-5 mr-2" />
                Search Buses
              </button>
            </div>
          </form>
        </div>
      </div>
  )
}

export default SearchBox