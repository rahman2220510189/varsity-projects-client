import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaUserShield, FaTrashAlt, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    // Fetch all users using the GET /api/users endpoint
    const { data: users = [], isLoading, refetch } = useQuery({
        queryKey: ['allUsersData'],
        queryFn: async () => {
            // Calls the unsecured GET /api/users route
            const res = await axiosSecure.get('/api/users'); 
            return res.data;
        }
    });

    // 1. Function to handle making a user an Admin
    const handleMakeAdmin = (user) => {
        // Calls the PATCH /api/users/admin/:id endpoint
        axiosSecure.patch(`/api/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch(); // Refresh the user list after successful update
                    Swal.fire({ 
                        title: `${user.name} is now an Admin!`, 
                        icon: 'success' 
                    });
                }
            })
            .catch(error => {
                Swal.fire({ 
                    title: 'Error!', 
                    text: 'Failed to make admin. Check console.', 
                    icon: 'error' 
                });
                console.error("Make Admin Error:", error);
            });
    };
    
    // 2. Function to handle deleting a user
    const handleDeleteUser = (user) => {
        Swal.fire({
            title: `Are you sure you want to delete ${user.name}?`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Calls the DELETE /api/users/:id endpoint
                axiosSecure.delete(`/api/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch(); // Refresh the user list after successful deletion
                            Swal.fire({ 
                                title: 'Deleted!', 
                                text: 'User has been deleted.', 
                                icon: 'success' 
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({ title: 'Error!', text: 'Deletion failed.', icon: 'error' });
                        console.error("Delete User Error:", error);
                    });
            }
        });
    };

    if (isLoading) return <p className="text-center py-10">Loading Users...</p>;

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-gray-800 flex items-center">
                <FaUsers className="mr-3 text-indigo-600" /> Manage All Users ({users.length})
            </h1>
            
            <div className="bg-white p-6 rounded-xl shadow-2xl overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user, index) => (
                            <tr key={user._id} className="hover:bg-indigo-50 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                                    {user.role === 'admin' ? (
                                        <span className="text-green-600 flex items-center"><FaUserShield className="mr-1"/> Admin</span>
                                    ) : (
                                        // "Make Admin" button calls the PATCH API
                                        <button onClick={() => handleMakeAdmin(user)} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-3 rounded-full text-xs transition">
                                            Make Admin
                                        </button>
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-3">
                                    {/* Delete Button calls the DELETE API */}
                                    <button onClick={() => handleDeleteUser(user)} className="text-red-600 hover:text-red-900 transition">
                                        <FaTrashAlt className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;