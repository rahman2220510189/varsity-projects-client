import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import useAdminCheck from '../Hooks/useAdminCheck';
import AdminSidebar from './adminLinks';

const AdminLayout = () => {
    const [isAdmin, isAdminLoading] = useAdminCheck(); 

    if (isAdminLoading) {
        return <p className="text-center py-20 text-xl font-bold">Verifying Access...</p>;
    }

    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            < AdminSidebar/>
            {/* Main Content Area */}
            <main className="flex-1 p-10">
                <Outlet /> {/* Renders the specific dashboard, users, or items content */}
            </main>
        </div>
    );
};
export default AdminLayout;