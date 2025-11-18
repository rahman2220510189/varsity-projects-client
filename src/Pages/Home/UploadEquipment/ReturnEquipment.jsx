import React, { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, User, Mail, Hash, Package, RefreshCw } from 'lucide-react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const ReturnEquipment = () => {
    const {id} =useParams();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();


    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm();

    const returnQuantity = watch('returnQuantity');

    useEffect(() =>{
        fetchItemDetails();

    }, [id]);

    const fetchItemDetails = async () => {
        try {
            const response = await axiosPublic.get(`/api/equipment/${id}`);
            setItem(response.data);
            setLoading(false);

        } catch (error) {
            console.error('Error fetching item details:', error);
            setItem(null);
            setLoading(false);
        };

    };

    const onSubmit = async (data) => {
        try {
            setSubmitting(true);
            const response = await axiosPublic.post(`/api/equipment/${id}/return`, data);
            alert(response.data.message || 'Return request submitted successfully');
            navigate('/');
        } catch (error) {
            console.error('Error submitting return request:', error);
            alert('Return request failed');
        } finally {
            setSubmitting(false);
        }
    };

      if (loading) {
          return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <RefreshCw className="w-8 h-8 text-purple-600 animate-spin" />
                <div className="text-3xl font-bold text-purple-600 ml-4">
                    Loading...
                </div>
            </div>
        ); 
        
    };

    if (!item) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-3xl font-bold text-red-600">Item not found</div>
            </div>
        );
    };

    const ReturnFormField = ({ icon: Icon, label, name, register, errors, rules, type = 'text', placeholder }) => (
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Icon className="w-4 h-4 mr-2 text-pink-600" /> {label} *
            </label>
            <input
                type={type}
                {...register(name, rules)}
                placeholder={placeholder}
                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all"
            />
            {errors[name] && (
                <span className="text-red-500 text-sm mt-1 block">
                    {errors[name].message}
                </span>
            )}
        </div>
    );

   return (
        <div className="min-h-screen mx-auto px-10 py-32 sm:px-6 lg:px-8  bg-gradient-to-r from-[#001f3f] via-blue-500 to-green-400 via-purple-500  min-h-screen">
            {/* Back Button */}
            <button 
                onClick={() => navigate('/')} 
                className="flex items-center mb-8 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-full hover:shadow-xl hover:translate-x-1 transition-all duration-300 shadow-lg"
            >
                <ArrowLeft className="w-5 h-5 mr-2" /> Back to List
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                
                {/* Item Details Section - Return Theme */}
                <div className="bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 rounded-3xl p-8 shadow-2xl">
                    {/* Image */}
                    <div className="h-96 rounded-2xl overflow-hidden mb-6 bg-white/20 flex items-center justify-center">
                        <img
                            src={`http://localhost:5000/uploads/${item.image}`}
                            alt={item.name}
                            className="max-h-full max-w-full object-contain p-4"
                        />
                    </div>
                    
                    {/* Details */}
                    <div className="bg-white rounded-2xl p-6 shadow-xl">
                        <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">
                            {item.name}
                        </h1>
                        
                        <div className="space-y-4">
                            <div>
                                <span className="text-sm font-semibold text-pink-600 uppercase tracking-wide">
                                    Current Available Quantity
                                </span>
                                <div className="mt-1">
                                    <span className="inline-block bg-gradient-to-r from-pink-500 to-yellow-500 text-white px-6 py-2 rounded-full font-bold text-xl">
                                        {item.quantity}
                                    </span>
                                </div>
                            </div>
                            
                            <div>
                                <span className="text-sm font-semibold text-pink-600 uppercase tracking-wide">
                                    Purpose
                                </span>
                                <p className="mt-1 text-gray-700 text-lg">
                                    {item.purpose}
                                </p>
                            </div>
                            
                            {/* ... other details ... */}
                        </div>
                    </div>
                </div>

                {/* Return Form */}
                <div className="bg-white rounded-3xl p-8 shadow-2xl border-2 border-gray-100">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-8 border-b pb-2">
                        Return Equipment Form
                    </h2>
                    
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        
                        {/* Name */}
                        <ReturnFormField 
                            icon={User}
                            label="Your Name"
                            name="userName"
                            register={register}
                            errors={errors}
                            rules={{ 
                                required: 'Name is required',
                                minLength: { value: 3, message: 'Name must be at least 3 characters' }
                            }}
                            placeholder="Enter your full name"
                        />

                        {/* Email */}
                        <ReturnFormField 
                            icon={Mail}
                            label="Email Address"
                            name="userEmail"
                            register={register}
                            errors={errors}
                            rules={{ 
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            }}
                            type="email"
                            placeholder="enter your email"
                        />
                        
                        {/* ID/Reference Number (REQUIRED FOR SERVER LOGIC) */}
                        <ReturnFormField 
                            icon={Hash}
                            label="ID"
                            name="Id"
                            register={register}
                            errors={errors}
                            rules={{ required: 'ID is required to match collection record' }}
                            placeholder="enter your ID"
                        />


                        {/* Quantity to Return */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                                <Package className="w-4 h-4 mr-2 text-pink-600" /> Quantity to Return *
                            </label>
                            <input
                                type="number"
                                min="1"
                                {...register('returnQuantity', {
                                    required: 'Quantity is required',
                                    min: { value: 1, message: 'Minimum quantity is 1' },
                                    valueAsNumber: true
                                })}
                                placeholder="Enter quantity"
                                className="w-full px-5 py-3 border-2 border-gray-200 rounded-xl outline-none focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all"
                            />
                            {errors.returnQuantity && (
                                <span className="text-red-500 text-sm mt-1 block">
                                    {errors.returnQuantity.message}
                                </span>
                            )}
                            {returnQuantity > 0 && (
                                <span className="text-green-600 text-sm mt-1 block font-medium">
                                    ✓ {returnQuantity} items are ready to return
                                </span>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full py-4 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-[1]"
                        >
                            {submitting ? 'Processing Return...' : 'Complete Return'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    ); 

}

export default ReturnEquipment

