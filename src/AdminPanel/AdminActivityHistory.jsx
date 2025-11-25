import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../firebase/Provider/AuthProviders';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const AdminActivityHistory = () => {
  const { user } = useContext(AuthContext);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [filterAction, setFilterAction] = useState('');
  const [viewMode, setViewMode] = useState('all');
  const axiosSecure = useAxiosSecure(); // Changed from axiosPublic
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetchAdminActivity();
    }
  }, [user, currentPage, filterAction, viewMode]);

  const fetchAdminActivity = async () => {
    try {
      setLoading(true);
      let endpoint = '';
      
      if (viewMode === 'my') {
        endpoint = `/api/admin/my-activity/${user.email}?page=${currentPage}&limit=10`;
      } else {
        endpoint = `/api/admin/activity-logs?page=${currentPage}&limit=10${filterAction ? `&action=${filterAction}` : ''}`;
      }
      
      console.log('Fetching from:', endpoint); // Debug log
      const response = await axiosSecure.get(endpoint);
      console.log('Response:', response.data); //  Debug log
      
      setActivities(response.data.logs);
      setTotalPages(response.data.totalPages);
      setTotalItems(response.data.totalItems);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching admin activity:', error);
      console.error('Error response:', error.response?.data); //  Better error logging
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getActionStyle = (action) => {
    const styles = {
      ADD_ITEM: {
        bg: 'bg-green-100',
        text: 'text-green-800',
        icon: '➕',
        label: 'Added Item'
      },
      DELETE_ITEM: {
        bg: 'bg-red-100',
        text: 'text-red-800',
        icon: '🗑️',
        label: 'Deleted Item'
      },
      UPDATE_ITEM: {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        icon: '✏️',
        label: 'Updated Item'
      },
      MAKE_ADMIN: {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        icon: '👑',
        label: 'Made Admin'
      },
      DELETE_USER: {
        bg: 'bg-orange-100',
        text: 'text-orange-800',
        icon: '👤',
        label: 'Deleted User'
      }
    };
    return styles[action] || {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      icon: '📋',
      label: action
    };
  };

  const renderDetails = (action, details) => {
    switch (action) {
      case 'ADD_ITEM':
        return (
          <div className="text-sm text-gray-700">
            <span className="font-semibold">{details.itemName}</span>
            <span className="text-gray-500"> (Quantity: {details.quantity})</span>
          </div>
        );
      
      case 'DELETE_ITEM':
        return (
          <div className="text-sm text-gray-700">
            <span className="font-semibold">{details.itemName}</span>
            <span className="text-gray-500"> (Qty: {details.quantity})</span>
          </div>
        );
      
      case 'UPDATE_ITEM':
        return (
          <div className="text-sm text-gray-700">
            <div className="font-semibold">{details.itemName}</div>
            {details.changes && (
              <div className="text-xs text-gray-600 mt-1">
                {details.changes.oldName !== details.changes.newName && (
                  <div>Name: {details.changes.oldName} → {details.changes.newName}</div>
                )}
                {details.changes.oldQuantity !== details.changes.newQuantity && (
                  <div>Quantity: {details.changes.oldQuantity} → {details.changes.newQuantity}</div>
                )}
              </div>
            )}
          </div>
        );
      
      case 'MAKE_ADMIN':
        return (
          <div className="text-sm text-gray-700">
            <span className="font-semibold">{details.targetUserName}</span>
            <div className="text-xs text-gray-600">{details.targetUserEmail}</div>
          </div>
        );
      
      case 'DELETE_USER':
        return (
          <div className="text-sm text-gray-700">
            <span className="font-semibold">{details.deletedUserName}</span>
            <div className="text-xs text-gray-600">{details.deletedUserEmail}</div>
          </div>
        );
      
      default:
        return <div className="text-sm text-gray-700">Action performed</div>;
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <div className="text-2xl font-bold text-gray-800 mb-2">Admin Access Required</div>
          <div className="text-gray-600 mb-6">Please login as admin to view activity logs</div>
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
          Loading Admin Activity...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-10 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Admin Activity Log</h1>
          <p className="text-gray-600 mt-2">
            Tracking all administrative actions • Total: {totalItems}
          </p>
        </div>
      
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">View Mode</label>
            <select
              value={viewMode}
              onChange={(e) => {
                setViewMode(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Admin Activities</option>
              <option value="my">My Activities Only</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Filter by Action</label>
            <select
              value={filterAction}
              onChange={(e) => {
                setFilterAction(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={viewMode === 'my'}
            >
              <option value="">All Actions</option>
              <option value="ADD_ITEM">Add Item</option>
              <option value="DELETE_ITEM">Delete Item</option>
              <option value="UPDATE_ITEM">Update Item</option>
              <option value="MAKE_ADMIN">Make Admin</option>
              <option value="DELETE_USER">Delete User</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-700 text-white rounded-2xl p-6 shadow-lg">
          <div className="text-sm font-semibold opacity-90 mb-2">Total Activities</div>
          <div className="text-4xl font-bold">{totalItems}</div>
        </div>
        <div className="bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 text-white rounded-2xl p-6 shadow-lg">
          <div className="text-sm font-semibold opacity-90 mb-2">Items Modified</div>
          <div className="text-4xl font-bold">
            {activities.filter(a => ['ADD_ITEM', 'DELETE_ITEM', 'UPDATE_ITEM'].includes(a.action)).length}
          </div>
        </div>
        <div className="bg-gradient-to-br from-cyan-500 via-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="text-sm font-semibold opacity-90 mb-2">User Management</div>
          <div className="text-4xl font-bold">
            {activities.filter(a => ['MAKE_ADMIN', 'DELETE_USER'].includes(a.action)).length}
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Activity Timeline</h2>
        
        {activities.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <div className="text-xl font-semibold text-gray-600">No Activities Yet</div>
            <p className="text-gray-500 mt-2">Admin activities will appear here</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const style = getActionStyle(activity.action);
              
              return (
                <div
                  key={activity._id}
                  className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`${style.bg} ${style.text} p-3 rounded-full text-2xl`}>
                        {style.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`${style.bg} ${style.text} px-3 py-1 rounded-full text-sm font-semibold`}>
                            {style.label}
                          </span>
                          <span className="text-sm text-gray-500">
                            by <span className="font-semibold text-gray-700">{activity.adminEmail}</span>
                          </span>
                        </div>
                        
                        {renderDetails(activity.action, activity.details)}
                        
                        <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            🕐 {formatDate(activity.timestamp)}
                          </span>
                          {activity.details.ipAddress && (
                            <span className="flex items-center gap-1">
                              🌐 {activity.details.ipAddress}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
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

export default AdminActivityHistory;