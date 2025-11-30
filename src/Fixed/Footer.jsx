import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-gray-900 text-gray-300 border-t border-indigo-700">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">

        {/* ABOUT */}
        <div>
          <h2 className="text-lg font-bold text-yellow-400 mb-2">DIU Embedded Lab</h2>
          <p className="text-gray-400 leading-relaxed">
            Centralized system for managing lab equipment & resources of Daffodil International University.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="font-semibold text-white mb-3 text-base">Quick Links</h3>
          <ul className="space-y-1">
            <li><a href="/" className="hover:text-yellow-400">Home (Equipment)</a></li>
            <li><a href="/history" className="hover:text-yellow-400">All Activities</a></li>
            <li><a href="/my-history" className="hover:text-yellow-400">My History</a></li>
            <li><a href="/login" className="hover:text-yellow-400">Login / Sign In</a></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold text-white mb-3 text-base">Contact</h3>
          <p>Email: <a href="mailto:embeddedlab@diu.edu.bd" className="hover:text-yellow-400">embeddedlab@diu.edu.bd</a></p>

          <div className="flex gap-4 mt-3 text-xl">
            <a href="#" className="hover:text-yellow-400"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="hover:text-yellow-400"><i className="fab fa-linkedin-in"></i></a>
            <a href="#" className="hover:text-yellow-400"><i className="fab fa-github"></i></a>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="text-center text-xs text-gray-500 py-4 border-t border-indigo-700 bg-black bg-opacity-20">
        © {new Date().getFullYear()} DIU Embedded System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
