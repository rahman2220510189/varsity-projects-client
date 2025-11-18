import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../firebase/Provider/AuthProviders';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
 // Your Firebase Auth Context

const MyHistory = () => {
  const { user } = useContext(AuthContext); // Get logged-in user
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  // Gradient colors for cards
  const gradients = [
    'from-purple-500 via-purple-600 to-indigo-700',
    'from-pink-500 via-red-500 to-yellow-500',
    'from-cyan-500 via-blue-500 to-blue-600',
  ];

  useEffect(() => {
    if (user?.email) {
      fetchUserHistory();
    }
  }, [user, currentPage]);

  // Fetch user-specific history
  const fetchUserHistory = async () => {
    try {
      setLoading(true);
      const response = await axiosPublic.get(
        `/api/history/user/${user.email}?page=${currentPage}&limit=9`
      );
      setHistory(response.data.history);
      setTotalPages(response.data.totalPages);
      setTotalItems(response.data.totalItems);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching history:', error);
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate days difference
  const getDaysRemaining = (returnDate, status) => {
    if (status === 'returned') return null;
    const today = new Date();
    const returnD = new Date(returnDate);
    const diffTime = returnD - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <div className="text-2xl font-bold text-gray-800 mb-2">Please Login</div>
          <div className="text-gray-600 mb-6">You need to login to view your history</div>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-3xl font-bold text-purple-600 animate-pulse">
          Loading Your History...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">My History</h1>
          <p className="text-gray-600 mt-2">
            Logged in as: <span className="font-semibold text-purple-600">{user.email}</span>
          </p>
        </div>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          ← Back to Equipment
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`bg-gradient-to-br ${gradients[0]} text-white rounded-2xl p-6 shadow-lg`}>
          <div className="text-sm font-semibold opacity-90 mb-2">Total Borrowed</div>
          <div className="text-4xl font-bold">{totalItems}</div>
        </div>
        <div className={`bg-gradient-to-br ${gradients[1]} text-white rounded-2xl p-6 shadow-lg`}>
          <div className="text-sm font-semibold opacity-90 mb-2">Currently Holding</div>
          <div className="text-4xl font-bold">
            {history.filter(h => h.status === 'collected').length}
          </div>
        </div>
        <div className={`bg-gradient-to-br ${gradients[2]} text-white rounded-2xl p-6 shadow-lg`}>
          <div className="text-sm font-semibold opacity-90 mb-2">Returned</div>
          <div className="text-4xl font-bold">
            {history.filter(h => h.status === 'returned').length}
          </div>
        </div>
      </div>

      {/* History Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {history.map((record, index) => {
          const daysRemaining = getDaysRemaining(record.returnDate, record.status);
          const isOverdue = daysRemaining !== null && daysRemaining < 0;

          return (
            <div
              key={record._id}
              className={`bg-gradient-to-br ${gradients[index % 3]} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300`}
            >
              {/* Image */}
              <div className="h-48 overflow-hidden bg-white/20">
                {record.itemImage ? (
                  <img
                    src={`http://localhost:5000/uploads/${record.itemImage}`}
                    alt={record.itemName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-6xl">
                    📦
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="bg-white p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {record.itemName}
                </h3>

                {/* Quantity */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600 text-sm">Quantity:</span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                    {record.collectQuantity}
                  </span>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-600 text-sm">Status:</span>
                  {record.status === 'collected' ? (
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                      Holding
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Returned
                    </span>
                  )}
                </div>

                {/* Dates */}
                <div className="border-t border-gray-200 pt-3 space-y-2">
                  <div className="text-xs text-gray-600">
                    <span className="font-semibold">Collected:</span> {formatDate(record.collectedAt)}
                  </div>
                  
                  {record.status === 'collected' ? (
                    <div className="text-xs">
                      <span className="font-semibold text-gray-600">Expected Return:</span>
                      <div className={`mt-1 ${isOverdue ? 'text-red-600' : 'text-orange-600'} font-semibold`}>
                        {formatDate(record.returnDate)}
                        {daysRemaining !== null && (
                          <span className="block">
                            {isOverdue 
                              ? `⚠️ Overdue by ${Math.abs(daysRemaining)} days` 
                              : `⏰ ${daysRemaining} days remaining`
                            }
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-green-600">
                      <span className="font-semibold">Returned:</span> {formatDate(record.returnedAt)}
                    </div>
                  )}
                </div>

                {/* Description if available */}
                {record.itemDescription && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {record.itemDescription}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {history.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📋</div>
          <div className="text-2xl font-bold text-gray-600">No History Yet</div>
          <div className="text-gray-500 mt-2 mb-6">
            You haven't borrowed any equipment yet
          </div>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Browse Equipment
          </button>
        </div>
      )}

      {/* Pagination */}
      {history.length > 0 && (
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            Previous
          </button>
          
          <span className="text-lg font-semibold text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyHistory;