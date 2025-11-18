import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserShield, FaPlusCircle, FaTrashAlt, FaClipboardList, FaHome } from 'react-icons/fa';

const adminLinks = (
    <>
        <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2 mt-4 border-t pt-4 border-gray-600">
            Equipment Management
        </h3>
        
        <NavLink 
            to="add-equipment"
            className={({ isActive }) => 
                `flex items-center p-3 rounded-lg transition duration-200 ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-200 hover:bg-gray-700'}`
            }
        >
            <FaPlusCircle className="mr-3" /> Add Equipment
        </NavLink>
        
        <NavLink 
            to="manage-items"
            className={({ isActive }) => 
                `flex items-center p-3 rounded-lg transition duration-200 ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-200 hover:bg-gray-700'}`
            }
        >
            <FaTrashAlt className="mr-3" /> Update & Delete
        </NavLink>

        <NavLink 
            to="due-list" 
            className={({ isActive }) => 
                `flex items-center p-3 rounded-lg transition duration-200 ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-200 hover:bg-gray-700'}`
            }
        >
            <FaClipboardList className="mr-3" /> Due Equipment
        </NavLink>

        <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2 mt-4 border-t pt-4 border-gray-600">
            User Management
        </h3>
        
        <NavLink 
            to= "managed-users" 
            className={({ isActive }) => 
                `flex items-center p-3 rounded-lg transition duration-200 ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-200 hover:bg-gray-700'}`
            }
        >
            <FaUserShield className="mr-3" /> Manage Users
        </NavLink>
        
        <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2 mt-4 border-t pt-4 border-gray-600">
            Navigation
        </h3>
        
        <NavLink 
            to="/" 
            className="flex items-center p-3 rounded-lg transition duration-200 text-gray-200 hover:bg-gray-700"
        >
            <FaHome className="mr-3" /> Back to Home
        </NavLink>
    </>
);

const AdminSidebar = () => {
    return (
        <aside className="w-72 bg-gray-800 p-6 space-y-8 shadow-2xl sticky top-0 h-screen overflow-y-auto">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Admin Panel
            </h1>
            <nav className="space-y-1">
                {adminLinks}
            </nav>
        </aside>
    );
};

export default AdminSidebar;