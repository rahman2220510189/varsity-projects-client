import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserShield, FaPlusCircle, FaTrashAlt, FaClipboardList, FaHome, FaTimes } from 'react-icons/fa';
import { BsClockHistory } from 'react-icons/bs';

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
        <NavLink 
            to= "all-history" 
            className={({ isActive }) => 
                `flex items-center p-3 rounded-lg transition duration-200 ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-200 hover:bg-gray-700'}`
            }
        >
            <BsClockHistory className="mr-3" /> All History
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

const AdminSidebar = ({isOpen, setIsOpen}) => {
   return (
        <aside 
            //  Responsive Positioning and Transition
            className={`
                w-72 bg-gray-800 p-6 space-y-8 shadow-2xl z-50 
                h-screen overflow-y-auto transition-transform duration-300
                
                // Mobile Overlay: Fixed position and sliding logic
                fixed top-0 left-0 
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                
                // Desktop: Static position (always visible)
                md:static md:translate-x-0
            `}
        >
            {/* Mobile Close Button (Visible only on small screens) */}
            <div className="flex justify-between items-center mb-6 md:hidden">
                <h1 className="text-3xl font-extrabold text-indigo-400">Admin Panel</h1>
                <button onClick={() => setIsOpen(false)} className="text-white hover:text-red-500">
                    <FaTimes size={24} />
                </button>
            </div>
            
            {/* Desktop Header */}
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent hidden md:block">
                Admin Panel
            </h1>
            
            {/* Navigation Links */}
            <nav className="space-y-1" onClick={() => setIsOpen(false)}> 
                {adminLinks}
            </nav>
        </aside>
    );
};

export default AdminSidebar;