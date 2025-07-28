import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactUs = () => {
  return (
    <section className="min-h-screen bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-6 mt-10">
            <div className="flex items-start space-x-4">
              <Mail className="text-blue-500 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Email</h4>
                <p className="text-gray-600 dark:text-gray-400">support@example.com</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Phone className="text-blue-500 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Phone</h4>
                <p className="text-gray-600 dark:text-gray-400">+1 234 567 890</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <MapPin className="text-blue-500 mt-1" />
              <div>
                <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Location</h4>
                <p className="text-gray-600 dark:text-gray-400">123 Main St, Kathmandu, Nepal</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
              <textarea
                rows="4"
                placeholder="Your message"
                className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
