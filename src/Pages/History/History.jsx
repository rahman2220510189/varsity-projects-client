import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const History = () => {
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
    }, [currentPage, searchTerm, statusFilter, axiosPublic]);

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const response = await axiosPublic.get(
                `/api/history?page=${currentPage}&limit=10&search=${searchTerm}&status=${statusFilter}`
            );
            setHistory(response.data.history);
            setTotalPages(response.data.totalPages);
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
        setSearchTerm(searchInput);
        setCurrentPage(1);
    };

    const formatDate = (date) => { 
        if (!date) return "N/A";
        const d = new Date(date);
        
        // Using 'bn-BD' (Bengali locale) for date formatting
        return d.toLocaleDateString("en-Us", { 
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
                <div className="text-3xl font-bold text-cyan-400 animate-pulse">
                    Loading History...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen  bg-gradient-to-r from-blue-700 via-cyan-400 to-[#001f3f] py-10 px-10 sm:py-16">
            <div className="max-w-full mx-auto px-4 py-10 sm:px-6 lg:px-8">
                
                {/* Header (Responsive for small screens) */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                        Collection History
                    </h1>
                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-lg"
                    >
                        ← Back to Equipment
                    </button>
                </div>

                {/*  Statistics Cards (Responsive Grid) */}
                {stats && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
                        {/* Card 1 */}
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-4 md:p-6 shadow-lg">
                            <div className="text-xs sm:text-sm font-semibold opacity-90 mb-1">Total Records</div>
                            <div className="text-2xl sm:text-4xl font-bold">{stats.totalRecords}</div>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-4 md:p-6 shadow-lg">
                            <div className="text-xs sm:text-sm font-semibold opacity-90 mb-1">Currently Collected</div>
                            <div className="text-2xl sm:text-4xl font-bold">{stats.totalCollected}</div>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl p-4 md:p-6 shadow-lg">
                            <div className="text-xs sm:text-sm font-semibold opacity-90 mb-1">Total Returned</div>
                            <div className="text-2xl sm:text-4xl font-bold">{stats.totalReturned}</div>
                        </div>
                        {/* Card 4 */}
                        <div className="bg-gradient-to-br from-pink-500 to-red-500 text-white rounded-2xl p-4 md:p-6 shadow-lg">
                            <div className="text-xs sm:text-sm font-semibold opacity-90 mb-1">Active Loans</div>
                            <div className="text-2xl sm:text-4xl font-bold">{stats.activeLoans}</div>
                        </div>
                    </div>
                )}

                {/* Search and Filter (Responsive Layout) */}
                <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-8">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Search by name, email, item, or ID..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="flex-1 px-5 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
                        />
                        {/* Filter is now correctly sized on mobile */}
                        <select
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="w-full md:w-auto px-5 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all"
                        >
                            <option value="">All Status</option>
                            <option value="collected">Collected</option>
                            <option value="returned">Returned</option>
                        </select>
                        <button
                            type="submit"
                            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                        >
                            Search
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                                <tr>
                                    <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">Item</th>
                                    <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">User Info</th>
                                    <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">Qty</th>
                                    <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">Collected Date</th>
                                    <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">Return Date</th>
                                    <th className="px-3 sm:px-6 py-4 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {history.length > 0 ? (
                                    history.map((record, index) => (
                                        <tr
                                            key={record._id}
                                            className={`${
                                                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                            } hover:bg-purple-50 transition-colors duration-200 text-sm`}
                                        >
                                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    {record.itemImage && (
                                                        <img
                                                            src={`http://localhost:5000/uploads/${record.itemImage}`}
                                                            alt={record.itemName}
                                                            className="w-8 h-8 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0"
                                                        />
                                                    )}
                                                    <div>
                                                        <div className="font-semibold text-gray-800 text-xs sm:text-sm">{record.itemName}</div>
                                                        <div className="text-xs text-gray-500">ID: {record.itemId ? record.itemId.slice(-6) : 'N/A'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-xs sm:text-sm">
                                                <div className="font-semibold text-gray-800">{record.userName}</div>
                                                <div className="text-gray-600 text-xs">{record.userEmail}</div>
                                                <div className="text-gray-600 text-xs">{record.Id}</div>
                                                <div className="text-gray-500 text-xs">
                                                    {record.role === 'student' ? '🎓 Student' : '👨‍🏫 Teacher'}
                                                    {record.department && ` • ${record.department}`}
                                                </div>
                                            </td>
                                            <td className="px-3 sm:px-6 py-4">
                                                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold text-xs">
                                                    {record.collectQuantity}
                                                </span>
                                            </td>
                                            <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                                                {formatDate(record.collectedAt)}
                                            </td>
                                            <td className="px-3 sm:px-6 py-4 text-xs sm:text-sm whitespace-nowrap">
                                                {record.returnedAt ? (
                                                    <span className="text-green-600 font-semibold">
                                                        {formatDate(record.returnedAt)}
                                                    </span>
                                                ) : (
                                                    <span className="text-orange-600 font-semibold">
                                                        Exp: {formatDate(record.returnDate)}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-3 sm:px-6 py-4">
                                                {record.status === 'collected' ? (
                                                    <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                                                        <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                                                        Collected
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                        Returned
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-10 text-center text-gray-500 text-lg">
                                            No history records found. Adjust your search or filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 sm:px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-sm"
                    >
                        Previous
                    </button>
                    
                    <span className="text-sm font-semibold text-gray-100">
                        Page {currentPage} of {totalPages}
                    </span>
                    
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 sm:px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 text-sm"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default History;