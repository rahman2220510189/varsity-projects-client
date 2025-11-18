import React, { useEffect, useState } from 'react'
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';

const DueEquipmentPanel = () => {
    const [dueItems, setDueItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    useEffect(() =>{
        loadDueItems();
    },[axiosPublic]);

    const loadDueItems = async () =>{
        try{
        setLoading(true);
        setError(null);
        const response = await axiosPublic.get('/api/history/due');
        setDueItems(response.data.dueHistory || []);
        } catch (err) {
            console.error('Error loading due items:', err);
            setError('Failed to load overdue equipment list. Please check the backend connection.');
            setDueItems([]);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-3xl font-bold text-red-600 animate-pulse">
                    Loading Overdue List...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-10 text-red-700 bg-red-100 border border-red-400 rounded-lg max-w-4xl mx-auto mt-10">
                <h2 className="text-xl font-bold mb-2">Error</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-red-700">
                    ⚠️ Overdue Equipment List (Penalty)
                </h1>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-lg"
                >
                    ← Back to Admin Panel
                </button>
            </div>

            {/* Statistics Card */}
            <div className="bg-gradient-to-br from-red-600 to-red-800 text-white rounded-2xl p-6 mb-8 shadow-lg">
                <div className="text-2xl font-bold">Total Overdue Records</div>
                <div className="text-5xl font-bold mt-2">{dueItems.length}</div>
            </div>

            {/* Overdue Items Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    {dueItems.length > 0 ? (
                        <table className="min-w-full">
                            <thead className="bg-red-700 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Equipment (Qty)</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">User Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">User ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Department</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Designation/Section</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Due Date</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Contact Email</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {dueItems.map((item, index) => (
                                    <tr
                                        key={item._id}
                                        className={`${index % 2 === 0 ? 'bg-red-50' : 'bg-white'} hover:bg-red-100 transition-colors duration-200`}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-800">{item.itemName} ({item.collectQuantity})</div>
                                        </td>
                                        <td className="px-6 py-4">{item.userName}</td>
                                        <td className="px-6 py-4">{item.Id}</td>
                                        <td className="px-6 py-4">{item.department}</td>
                                        <td className="px-6 py-4">
                                            {item.role === 'teacher' ? item.designation : item.section}
                                        </td>
                                        <td className="px-6 py-4 text-red-600 font-bold">
                                            {formatDate(item.returnDate)}
                                        </td>
                                        <td className="px-6 py-4">{item.userEmail}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-center py-20 text-gray-500 text-lg">
                            <div className="text-6xl mb-4">🎉</div>
                            All equipment has been returned on time! No overdue items.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DueEquipmentPanel;