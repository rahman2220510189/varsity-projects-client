import React, { useState, useEffect, act } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import EditModal from './EditModel';
 

const AdminPanel = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    // New state to track which item's description/purpose is expanded
    const [expandedItemIds, setExpandedItemIds] = useState({}); 
    const GOOGLE_API_KEY ="https://script.google.com/macros/s/AKfycbz16FzJyOiy62I1CErXWVnnKf0wqjwsiBMjupVcK6kss_kMY4Aoyqjw_kpMHUaiFy4/exec";
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        loadItems();
    }, [axiosPublic]);

    const loadItems = async () => {
        try {
            setPageLoading(true);
            const response = await axiosPublic.get('/api/equipment');
            setItems(response.data.items);
        } catch (error) {
            console.error('Error loading items:', error);
            setItems([]);
        } finally {
            setPageLoading(false);
        }
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id, itemName) => {
        if (window.confirm(`Are you sure you want to permanently delete "${itemName}"? This action cannot be undone.`)) {
            try {
                await axiosPublic.delete(`/api/equipment/${id}`);

                const sheetsData = {
                    action: 'delete',
                    name: itemName,
                }

                await fetch(GOOGLE_API_KEY, {
                    method: 'POST',
                    mode: 'no-cors',    
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(sheetsData),
                });
                alert('Item deleted successfully!');
                loadItems();
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message;
                alert('Error deleting item: ' + errorMessage);
            }
        }
    };

    const handleUpdateSuccess = () => {
        setIsEditModalOpen(false);
        setSelectedItem(null);
        loadItems();
    };

    // New utility function to truncate text to a maximum number of words
    const truncateText = (text, maxWords) => {
        if (!text) return '';
        const words = text.split(/\s+/);
        if (words.length <= maxWords) return text;
        return words.slice(0, maxWords).join(' ') + '...';
    };

    // New handler to toggle the expanded state for an item's description/purpose
    const toggleExpand = (id) => {
        setExpandedItemIds(prev => ({
            ...prev,
            [id]: !prev[id] 
        }));
    };

    if (pageLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-3xl font-bold text-purple-600 animate-pulse">
                    Loading Admin Panel...
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-r from-teal-500 to-green-600 px-10 py-24 sm:px-6 lg:px-8">
            {/* Header and Navigation */}
            <div className="flex items-center justify-between  mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                    Update and Delete Equipment
                </h1>
                <button
                    onClick={() => navigate('/')}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 shadow-lg"
                >
                    ← Back to Equipment
                </button>
            </div>

            {/* Total Items Statistics Card */}
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl p-6 mb-8 shadow-lg">
                <div className="text-2xl font-bold">Total Equipment Items</div>
                <div className="text-5xl font-bold mt-2">{items.length}</div>
            </div>

            {/* Items Management Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Image</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Description</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Quantity</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Purpose</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Website</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {items.length > 0 ? (
                                items.map((item, index) => {
                                    const isExpanded = expandedItemIds[item._id];
                                    const descriptionText = isExpanded ? item.description : truncateText(item.description, 20);
                                    const purposeText = isExpanded ? item.purpose : truncateText(item.purpose, 20);
                                    const descriptionIsTruncated = item.description && item.description.split(/\s+/).length > 20;
                                    const purposeIsTruncated = item.purpose && item.purpose.split(/\s+/).length > 20;

                                    return (
                                        <tr
                                            key={item._id}
                                            className={`${
                                                index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                            } hover:bg-purple-50 transition-colors duration-200`}
                                        >
                                            <td className="px-6 py-4">
                                                <img
                                                    src={`http://localhost:5000/uploads/${item.image}`}
                                                    alt={item.name}
                                                    className="w-20 h-20 rounded-lg object-cover shadow-md"
                                                />
                                            </td>
                                            {/* Name is shown in full */}
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-gray-800">{item.name}</div>
                                            </td>
                                            
                                            {/* Description with More/Less button */}
                                            <td className="px-6 py-4 max-w-xs">
                                                <div className="text-sm text-gray-600">
                                                    {descriptionText}
                                                    {descriptionIsTruncated && (
                                                        <button 
                                                            onClick={() => toggleExpand(item._id)}
                                                            className="text-purple-600 hover:text-purple-800 font-semibold ml-2 text-xs"
                                                        >
                                                            {isExpanded ? 'Less' : 'More'}
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                            
                                            <td className="px-6 py-4">
                                                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
                                                    {item.quantity}
                                                </span>
                                            </td>
                                            
                                            {/* Purpose with More/Less button */}
                                            <td className="px-6 py-4 max-w-xs">
                                                <div className="text-sm text-gray-600">
                                                    {purposeText}
                                                    {purposeIsTruncated && (
                                                        <button 
                                                            onClick={() => toggleExpand(item._id)}
                                                            className="text-purple-600 hover:text-purple-800 font-semibold ml-2 text-xs"
                                                        >
                                                            {isExpanded ? 'Less' : 'More'}
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                            
                                            <td className="px-6 py-4">
                                                {item.website ? (
                                                    <a
                                                        href={item.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-purple-600 hover:text-purple-800 text-sm underline"
                                                    >
                                                        Link
                                                    </a>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">N/A</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-md"
                                                    >
                                                        ✏️ Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item._id, item.name)}
                                                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300 shadow-md"
                                                    >
                                                        🗑️ Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-10 text-center text-gray-500 text-lg">
                                        No equipment items found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty State message when no items exist and not loading */}
            {items.length === 0 && !pageLoading && (
                <div className="text-center py-20">
                    <div className="text-6xl mb-4">📦</div>
                    <div className="text-2xl font-bold text-gray-600">No equipment items yet</div>
                    <div className="text-gray-500 mt-2">Add some equipment to get started!</div>
                </div>
            )}

            {/* Edit Modal Component */}
            {isEditModalOpen && (
                <EditModal
                    item={selectedItem}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedItem(null);
                    }}
                    onSuccess={handleUpdateSuccess}
                />
            )}
        </div>
    );
};

export default AdminPanel;