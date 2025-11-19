import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAdminCheck from "../Hooks/useAdminCheck";
import AdminSidebar from "./adminLinks";

const AdminLayout = () => {
  const [isSidebarOpen, SetIsSidebarOpen] = useState(false);
  const [isAdmin, isAdminLoading] = useAdminCheck();

  if (isAdminLoading) {
    return (
      <p className="text-center py-20 text-xl font-bold">Verifying Access...</p>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar isOpen={isSidebarOpen} setIsOpen={SetIsSidebarOpen} />

      <main className="flex-1 p-4 md:p-10">
        <button
          onClick={() => SetIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden fixed top-4 left-4 z-40 p-3 rounded-lg bg-indigo-600 text-white shadow-md hover:bg-indigo-700"
        ></button>
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}
        <Outlet />{" "}
        {/* Renders the specific dashboard, users, or items content */}
      </main>
    </div>
  );
};
export default AdminLayout;
