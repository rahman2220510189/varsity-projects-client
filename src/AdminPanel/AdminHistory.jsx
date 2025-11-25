import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";

const AdminHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [stats, setStats] = useState(null);
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    fetchHistory();
    fetchStats();
  }, [currentPage, searchTerm, statusFilter]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await axiosPublic.get(
        `/api/history?page=${currentPage}&limit=10&search=${searchTerm}&status=${statusFilter}`
      );
      setHistory(response.data.history || []);
      setTotalPages(response.data.totalPages || 1);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching history:", error);
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axiosPublic.get("/api/history/stats");
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput.trim());
    setCurrentPage(1);
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-cyan-800 to-indigo-900">
        <div className="text-center">
          <div className="text-4xl font-bold text-white mb-4 animate-pulse">
            Loading History...
          </div>
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-800 to-indigo-900 py-10 px-10 sm:py-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center sm:text-left mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">
            Collection History
          </h1>
          <p className="text-cyan-200 text-lg">Monitor all equipment borrowing & returns</p>
        </div>

        {/* Back Button */}
        <div className="flex justify-center sm:justify-end mb-8">
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
          >
            ← Back to Equipment
          </button>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { label: "Total Records", value: stats.totalRecords, color: "from-blue-500 to-blue-700" },
              { label: "Currently Out", value: stats.totalCollected, color: "from-emerald-500 to-teal-600" },
              { label: "Returned", value: stats.totalReturned, color: "from-purple-500 to-indigo-600" },
              { label: "Active Loans", value: stats.activeLoans, color: "from-pink-500 to-rose-600" },
            ].map((stat, i) => (
              <div
                key={i}
                className={`bg-gradient-to-br ${stat.color} p-6 rounded-2xl shadow-2xl text-white transform hover:scale-105 transition-transform duration-300`}
              >
                <p className="text-sm opacity-90">{stat.label}</p>
                <p className="text-4xl font-bold mt-2">{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Search & Filter */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 shadow-xl">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search by name, email, item, ID..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="px-6 py-4 rounded-xl bg-white/20 placeholder-cyan-200 text-white focus:outline-none focus:ring-4 focus:ring-cyan-400/50"
            />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-6 py-4 rounded-xl bg-white/20 text-white focus:outline-none focus:ring-4 focus:ring-cyan-400/50"
            >
              <option value="" className="text-gray-800">All Status</option>
              <option value="collected" className="text-gray-800">Currently Holding</option>
              <option value="returned" className="text-gray-800">Returned</option>
            </select>
            <button
              type="submit"
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-500 hover:to-blue-700 transform hover:scale-105 transition-all"
            >
              Search
            </button>
          </form>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white">
                <tr>
                  <th className="px-6 py-5 text-left">Item</th>
                  <th className="px-6 py-5 text-left">User Info</th>
                  <th className="px-6 py-5">Qty</th>
                  <th className="px-6 py-5">Collected</th>
                  <th className="px-6 py-5">Return/Returned</th>
                  <th className="px-6 py-5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {history.length > 0 ? (
                  history.map((record) => (
                    <tr key={record._id} className="hover:bg-purple-50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          {record.itemImage && (
                            <img
                              src={`https://my-varsity-projects-server.onrender.com/uploads/${record.itemImage}`}
                              alt={record.itemName}
                              className="w-14 h-14 rounded-lg object-cover"
                            />
                          )}
                          <div>
                            <div className="font-semibold">{record.itemName}</div>
                            <div className="text-sm text-gray-500">ID: {record.itemId?.slice(-6)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="text-sm">
                          <div className="font-bold text-gray-800">{record.userName}</div>
                          <div className="text-gray-600">{record.userEmail}</div>
                          <div className="text-gray-500">{record.Id} • {record.department}</div>
                          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {record.role === 'student' ? 'Student' : 'Teacher'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-bold">
                          {record.collectQuantity}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-sm">{formatDate(record.collectedAt)}</td>
                      <td className="px-6 py-5 text-sm">
                        {record.returnedAt ? (
                          <span className="text-green-600 font-bold">{formatDate(record.returnedAt)}</span>
                        ) : (
                          <span className="text-orange-600 font-bold">Exp: {formatDate(record.returnDate)}</span>
                        )}
                      </td>
                      <td className="px-6 py-5">
                        {record.status === 'collected' ? (
                          <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                            Holding
                          </span>
                        ) : (
                          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
                            Returned
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-gray-500">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden space-y-4 mb-8">
          {history.length > 0 ? (
            history.map((record) => (
              <div key={record._id} className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow">
                <div className="flex gap-4 mb-4">
                  {record.itemImage && (
                    <img
                      src={`https://my-varsity-projects-server.onrender.com/uploads/${record.itemImage}`}
                      alt={record.itemName}
                      className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{record.itemName}</h3>
                    <p className="text-sm text-gray-600">Qty: <strong>{record.collectQuantity}</strong></p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mt-2 ${
                      record.status === 'collected' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {record.status === 'collected' ? 'Holding' : 'Returned'}
                    </span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <p><strong>User:</strong> {record.userName} ({record.userEmail})</p>
                  <p><strong>ID:</strong> {record.Id} • {record.department}</p>
                  <p><strong>Collected:</strong> {formatDate(record.collectedAt)}</p>
                  <p><strong>{record.returnedAt ? 'Returned' : 'Due'}:</strong> {record.returnedAt ? formatDate(record.returnedAt) : formatDate(record.returnDate)}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-white text-lg">
              No records found
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-8 py-3 bg-white/20 text-white rounded-full disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-white font-bold text-lg">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-8 py-3 bg-white/20 text-white rounded-full disabled:opacity-50"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
};

export default AdminHistory;