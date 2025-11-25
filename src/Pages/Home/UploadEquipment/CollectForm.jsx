// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// import { ArrowLeft, User, Mail, Phone, Calendar, Hash, Truck, Briefcase, MinusCircle, CheckCircle, Package, Globe } from 'lucide-react';
// const CollectForm = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [item, setItem] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [submitting, setSubmitting] = useState(false);
//     const [role, setRole] = useState('student'); // Default role

//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         watch,
//     } = useForm({
//         defaultValues: {
//             role: 'student', // Set default value for the select box
//         }
//     });

//     const collectQuantity = watch('collectQuantity');
//     const watchedRole = watch('role', 'student'); // Watch the role selection

//     // Update the local role state when the form role changes
//     useEffect(() => {
//         setRole(watchedRole);
//     }, [watchedRole]);

//     useEffect(() => {
//         fetchItemDetails();
//     }, [id]);

//     const fetchItemDetails = async () => {
//         try {
//             // Using plain axios here, assuming you don't have useAxiosPublic available here
//             const response = await axios.get(`http://localhost:5000/api/equipment/${id}`);
//             setItem(response.data);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching item:', error);
//             setLoading(false);
//             // Optionally navigate away or show a clear error state if item fetch fails
//         }
//     };

//     const onSubmit = async (data) => {
//         try {
//             setSubmitting(true);
//             const response = await axios.post(`http://localhost:5000/api/equipment/${id}/collect`, {
//                 ...data,
//                 // The role is now included from the 'data' object via react-hook-form
//             });

//             alert('Equipment collected successfully!');
//             navigate('/');
//         } catch (error) {
//             const errorMessage = error.response?.data?.message || 'Error collecting equipment';
//             alert(errorMessage);
//             console.error('Error:', error);
//         } finally {
//             setSubmitting(false);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex justify-center items-center h-screen bg-gray-50">
//                 <MinusCircle className="w-8 h-8 animate-spin text-indigo-600" />
//                 <span className="ml-2 text-xl font-medium text-gray-700">Loading...</span>
//             </div>
//         );
//     }

//     if (!item) {
//         return <div className="text-center p-10 text-red-600 font-bold text-2xl">Item not found</div>;
//     }

//     const today = new Date().toISOString().split('T')[0]; // For setting min date

//     return (
//         <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
//             <div className="max-w-6xl mx-auto">
//                 {/* Back Button */}
//                 <button 
//                     onClick={() => navigate(-1)} 
//                     className="flex items-center text-indigo-600 hover:text-indigo-800 transition duration-150 mb-6 font-medium"
//                 >
//                     <ArrowLeft className="w-5 h-5 mr-2" />
//                     Back to List
//                 </button>

//                 <div className="bg-white shadow-2xl rounded-xl p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
                    
//                     {/* Item Details Section */}
//                     <div className="item-details-section">
//                         <h2 className="text-3xl font-bold text-gray-900 mb-6 border-b pb-2">Equipment Details</h2>
                        
//                         {/* Image */}
//                         <div className="bg-gray-100 rounded-lg p-4 mb-6 flex justify-center items-center h-64">
//                             <img 
//                                 src={`http://localhost:5000/uploads/${item.image}`} 
//                                 alt={item.name} 
//                                 className="max-h-full max-w-full object-contain rounded-lg"
//                             />
//                         </div>

//                         {/* Info Block */}
//                         <div className="space-y-3">
//                             <h3 className="text-2xl font-extrabold text-indigo-700">{item.name}</h3>
                            
//                             <div className="flex items-center text-lg">
//                                 <span className="font-semibold text-gray-600 mr-2">Available Quantity:</span>
//                                 <span className={`px-3 py-1 rounded-full text-white font-bold text-sm ${item.quantity > 0 ? 'bg-green-500' : 'bg-red-500'}`}>
//                                     {item.quantity}
//                                 </span>
//                             </div>

//                             <p className="text-gray-700">
//                                 <span className="font-semibold text-gray-600">Purpose:</span> {item.purpose}
//                             </p>
                            
//                             <p className="text-gray-500 text-sm border-l-4 border-indigo-400 pl-3 pt-2">
//                                 <span className="font-semibold text-gray-600">Description:</span> <br/>{item.description}
//                             </p>

//                             {item.website && (
//                                 <a href={item.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-500 hover:text-blue-700 transition duration-150 text-sm">
//                                     <Globe className="w-4 h-4 mr-1"/> {item.website}
//                                 </a>
//                             )}
//                         </div>
//                     </div>

//                     {/* Collection Form Section */}
//                     <div className="form-section bg-indigo-50 p-6 rounded-xl shadow-inner">
//                         <h2 className="text-3xl font-bold text-indigo-800 mb-6">Collect Item</h2>
//                         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            
//                             {/* Role Selection */}
//                             <div className="space-y-1">
//                                 <label className="flex items-center text-sm font-medium text-gray-700">
//                                     <User className="w-4 h-4 mr-2" /> User Role <span className="text-red-500 ml-1">*</span>
//                                 </label>
//                                 <select
//                                     {...register('role', { required: 'Role is required' })}
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
//                                 >
//                                     <option value="student">Student</option>
//                                     <option value="teacher">Teacher</option>
//                                 </select>
//                                 {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
//                             </div>

//                             {/* Common Fields */}
//                             <FormField icon={User} label="Your Name" name="userName" register={register} errors={errors} rules={{ required: 'Name is required', minLength: { value: 3, message: 'Name must be at least 3 characters' } }} placeholder="Enter your full name" />
//                             <FormField icon={Mail} label="Email Address" name="userEmail" register={register} errors={errors} rules={{ required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' } }} type="email" placeholder="your.email@example.com" />
//                             <FormField icon={Phone} label="Phone Number" name="userPhone" register={register} errors={errors} rules={{ required: 'Phone number is required', pattern: { value: /^[0-9]{10,15}$/, message: 'Invalid phone number' } }} type="tel" placeholder="e.g., 01XXXXXXXXX" />
//                             <FormField icon={Hash} label="ID/Reference Number" name="Id" register={register} errors={errors} rules={{ required: 'ID is required' }} placeholder="Your Student/Faculty ID" />


//                             {/* Quantity */}
//                             <div className="space-y-1">
//                                 <label className="flex items-center text-sm font-medium text-gray-700">
//                                     <Package className="w-4 h-4 mr-2" /> Quantity to Collect <span className="text-red-500 ml-1">*</span>
//                                 </label>
//                                 <input
//                                     type="number"
//                                     min="1"
//                                     max={item.quantity}
//                                     {...register('collectQuantity', {
//                                         required: 'Quantity is required',
//                                         min: { value: 1, message: 'Minimum quantity is 1' },
//                                         max: { value: item.quantity, message: `Maximum ${item.quantity} available` },
//                                         valueAsNumber: true,
//                                     })}
//                                     placeholder="Enter quantity"
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
//                                     disabled={item.quantity === 0}
//                                 />
//                                 {errors.collectQuantity && <p className="text-red-500 text-xs mt-1">{errors.collectQuantity.message}</p>}
//                                 {collectQuantity > 0 && collectQuantity <= item.quantity && (
//                                     <p className="flex items-center text-green-600 text-sm mt-1">
//                                         <CheckCircle className="w-4 h-4 mr-1" /> {collectQuantity} items will be collected.
//                                     </p>
//                                 )}
//                             </div>

//                             {/* Return Date */}
//                             <div className="space-y-1">
//                                 <label className="flex items-center text-sm font-medium text-gray-700">
//                                     <Calendar className="w-4 h-4 mr-2" /> Expected Return Date <span className="text-red-500 ml-1">*</span>
//                                 </label>
//                                 <input
//                                     type="date"
//                                     min={today}
//                                     {...register('returnDate', {
//                                         required: 'Return date is required',
//                                         validate: (value) => {
//                                             const selectedDate = new Date(value);
//                                             const current = new Date(today); // Use today's date for validation
//                                             return selectedDate >= current || 'Return date must be today or future date';
//                                         },
//                                     })}
//                                     className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
//                                 />
//                                 {errors.returnDate && <p className="text-red-500 text-xs mt-1">{errors.returnDate.message}</p>}
//                             </div>

//                             {/* Conditional Fields */}
//                             {role === 'student' && (
//                                 <>
//                                     <FormField icon={Truck} label="Department" name="department" register={register} errors={errors} rules={{ required: 'Department is required' }} placeholder="Your department" />
//                                     <FormField icon={Hash} label="Section" name="section" register={register} errors={errors} rules={{ required: 'Section is required' }} placeholder="Your section (e.g., A, B)" />
//                                 </>
//                             )}

//                             {role === 'teacher' && (
//                                 <>
//                                     <FormField icon={Truck} label="Department" name="department" register={register} errors={errors} rules={{ required: 'Department is required' }} placeholder="Your department" />
//                                     <FormField icon={Briefcase} label="Designation" name="designation" register={register} errors={errors} rules={{ required: 'Designation is required' }} placeholder="Your designation (e.g., Lecturer, Professor)" />
//                                 </>
//                             )}
                            
//                             {/* Submit Button */}
//                             <button
//                                 type="submit"
//                                 className={`w-full py-3 px-4 font-semibold rounded-lg text-white shadow-lg transition duration-300 ${
//                                     submitting || item.quantity === 0 
//                                         ? 'bg-gray-400 cursor-not-allowed'
//                                         : 'bg-indigo-600 hover:bg-indigo-700'
//                                 }`}
//                                 disabled={submitting || item.quantity === 0}
//                             >
//                                 {submitting ? 'Collecting...' : 'Collect Equipment'}
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// // Helper component for cleaner form rendering
// const FormField = ({ icon: Icon, label, name, register, errors, rules, type = 'text', placeholder }) => (
//     <div className="space-y-1">
//         <label className="flex items-center text-sm font-medium text-gray-700">
//             <Icon className="w-4 h-4 mr-2" /> {label} <span className="text-red-500 ml-1">*</span>
//         </label>
//         <input
//             type={type}
//             {...register(name, rules)}
//             placeholder={placeholder}
//             className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
//         />
//         {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>}
//     </div>
// );

// export default CollectForm

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
// Globe is now correctly imported
import { ArrowLeft, User, Mail, Phone, Calendar, Hash, Truck, Briefcase, MinusCircle, CheckCircle, Package, Globe } from 'lucide-react';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

// Helper component for cleaner form rendering with colored icons
// Note: This must be defined outside the main component
const FormField = ({ icon: Icon, label, name, register, errors, rules, type = 'text', placeholder }) => (
    <div className="space-y-1">
        <label className="flex items-center text-sm font-medium text-gray-700">
            {/* Set icon color to indigo-500 */}
            <Icon className="w-4 h-4 mr-2 text-indigo-500" /> {label} <span className="text-red-500 ml-1">*</span>
        </label>
        <input
            type={type}
            {...register(name, rules)}
            placeholder={placeholder}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
        />
        {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name].message}</p>}
    </div>
);

const CollectForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const axiosPublic = useAxiosPublic();
    
    // Default role handling via useForm hook
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            role: 'student',
        }
    });

    const collectQuantity = watch('collectQuantity');
    const watchedRole = watch('role', 'student');
    const setRole = useState(watchedRole)[1]; // Keeping setRole function to maintain previous logic structure

    useEffect(() => {
        setRole(watchedRole);
    }, [watchedRole]);

    useEffect(() => {
        fetchItemDetails();
    }, [id]);

    const fetchItemDetails = async () => {
        try {
            const response = await axiosPublic.get(`/api/equipment/${id}`);
            setItem(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching item:', error);
            setLoading(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            setSubmitting(true);
            const response = await axiosPublic.post(`/api/equipment/${id}/collect`, {
                ...data,
            });

            alert('Equipment collected successfully!');
            navigate('/');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error collecting equipment';
            alert(errorMessage);
            console.error('Error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-100 via-blue-100 to-teal-100">
                <MinusCircle className="w-8 h-8 animate-spin text-indigo-600" />
                <span className="ml-2 text-xl font-medium text-gray-700">Loading...</span>
            </div>
        );
    }

    if (!item) {
        return <div className="text-center p-10 text-red-600 font-bold text-2xl">Item not found</div>;
    }

    const today = new Date().toISOString().split('T')[0];

    return (
        //  Page Background Gradient: Three colors
        <div className="min-h-screen mt-10 bg-gradient-to-br from-indigo-100 via-blue-100 to-teal-100 p-4 sm:p-8">
            <div className="max-w-7xl mx-auto pt-10">
                {/* Back Button */}
                <button 
                    onClick={() => navigate(-1)} 
                    className="flex items-center text-indigo-600 hover:text-indigo-800 transition duration-150 mb-8 font-semibold"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 text-indigo-600" />
                    Back to List
                </button>

                <div className="bg-white shadow-2xl rounded-3xl overflow-hidden">
                    {/* Item Details Section (Top - Full Width) */}
                    <div className="p-8 lg:p-12 bg-indigo-50 border-b border-indigo-200">
                        <h2 className="text-4xl text-center font-extrabold text-indigo-800 mb-10">Equipment Details</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                            {/* Image */}
                            <div className="md:col-span-1 bg-white rounded-xl shadow-md p-4 flex justify-center items-center h-64">
                                <img 
                                    src={`https://my-varsity-projects-server.onrender.com/uploads/${item.image}`} 
                                    alt={item.name} 
                                    className="max-h-full max-w-full object-contain rounded-lg"
                                />
                            </div>

                            {/* Info Block */}
                            <div className="md:col-span-2 space-y-4">
                                <h3 className="text-3xl font-extrabold text-gray-900">{item.name}</h3>
                                
                                <div className="flex items-center text-lg">
                                    <span className="font-semibold text-gray-600 mr-3">Available Quantity:</span>
                                    <span className={`px-4 py-1 rounded-full text-white font-bold text-base shadow-md ${item.quantity > 0 ? 'bg-green-600' : 'bg-red-600'}`}>
                                        {item.quantity}
                                    </span>
                                </div>

                                <p className="text-gray-700">
                                    <span className="font-semibold text-indigo-600">Purpose:</span> {item.purpose}
                                </p>
                                
                                <p className="text-gray-500 text-sm border-l-4 border-indigo-400 pl-3 pt-2 italic">
                                    <span className="font-semibold text-gray-700">Description:</span> <br/>{item.description}
                                </p>

                                {item.website && (
                                    <a href={item.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-500 hover:text-blue-700 transition duration-150 text-sm font-medium">
                                        <Globe className="w-4 h-4 mr-1 text-blue-500"/> Visit Website
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    {/* Collection Form Section (Bottom - Full Width) */}
                    <div className="p-8 lg:p-12">
                        <h2 className="text-3xl  text-center  text-gray-800 mb-8 border-b pb-2">Collection Form</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto space-y-6">
                            
                            {/* Role Selection */}
                            <div className="space-y-1">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <User className="w-4 h-4 mr-2 text-indigo-500" /> User Role <span className="text-red-500 ml-1">*</span>
                                </label>
                                <select
                                    {...register('role', { required: 'Role is required' })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                                >
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                </select>
                                {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
                            </div>

                            {/* Common Fields */}
                            <FormField icon={User} label="Your Name" name="userName" register={register} errors={errors} rules={{ required: 'Name is required', minLength: { value: 3, message: 'Name must be at least 3 characters' } }} placeholder="Enter your full name" />
                            <FormField icon={Mail} label="Email Address" name="userEmail" register={register} errors={errors} rules={{ required: 'Email is required', pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Invalid email address' } }} type="email" placeholder="enter your email" />
                            <FormField icon={Phone} label="Phone Number" name="userPhone" register={register} errors={errors} rules={{ required: 'Phone number is required', pattern: { value: /^[0-9]{10,15}$/, message: 'Invalid phone number' } }} type="tel" placeholder="enter your phone number" />
                            <FormField icon={Hash} label="ID" name="Id" register={register} errors={errors} rules={{ required: 'ID is required' }} placeholder="enter your ID" />

                            {/* Quantity */}
                            <div className="space-y-1">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <Package className="w-4 h-4 mr-2 text-indigo-500" /> Quantity to Collect <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max={item.quantity}
                                    {...register('collectQuantity', {
                                        required: 'Quantity is required',
                                        min: { value: 1, message: 'Minimum quantity is 1' },
                                        max: { value: item.quantity, message: `Maximum ${item.quantity} available` },
                                        valueAsNumber: true,
                                    })}
                                    placeholder="Enter quantity"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                                    disabled={item.quantity === 0}
                                />
                                {errors.collectQuantity && <p className="text-red-500 text-xs mt-1">{errors.collectQuantity.message}</p>}
                                {collectQuantity > 0 && collectQuantity <= item.quantity && (
                                    <p className="flex items-center text-green-600 text-sm mt-1 font-medium">
                                        <CheckCircle className="w-4 h-4 mr-1 text-green-600" /> {collectQuantity} items will be collected.
                                    </p>
                                )}
                            </div>

                            {/* Return Date */}
                            <div className="space-y-1">
                                <label className="flex items-center text-sm font-medium text-gray-700">
                                    <Calendar className="w-4 h-4 mr-2 text-indigo-500" /> Expected Return Date <span className="text-red-500 ml-1">*</span>
                                </label>
                                <input
                                    type="date"
                                    min={today}
                                    {...register('returnDate', {
                                        required: 'Return date is required',
                                        validate: (value) => {
                                            const selectedDate = new Date(value);
                                            const current = new Date(today);
                                            return selectedDate >= current || 'Return date must be today or a future date';
                                        },
                                    })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
                                />
                                {errors.returnDate && <p className="text-red-500 text-xs mt-1">{errors.returnDate.message}</p>}
                            </div>

                            {/* Conditional Fields */}
                            {watchedRole === 'student' && (
                                <>
                                    <FormField icon={Truck} label="Department" name="department" register={register} errors={errors} rules={{ required: 'Department is required' }} placeholder="Your department" />
                                    <FormField icon={Hash} label="Section" name="section" register={register} errors={errors} rules={{ required: 'Section is required' }} placeholder="enter your section" />
                                </>
                            )}

                            {watchedRole === 'teacher' && (
                                <>
                                    <FormField icon={Truck} label="Department" name="department" register={register} errors={errors} rules={{ required: 'Department is required' }} placeholder="Your department" />
                                    <FormField icon={Briefcase} label="Designation" name="designation" register={register} errors={errors} rules={{ required: 'Designation is required' }} placeholder="Your designation (e.g., Lecturer, Professor)" />
                                </>
                            )}
                            
                            {/* Submit Button with Gradient */}
                            <button
                                type="submit"
                                className={`w-full py-3 px-4 font-extrabold rounded-lg text-white shadow-xl transition duration-300 transform hover:scale-[1.01] ${
                                    submitting || item.quantity === 0 
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800'
                                }`}
                                disabled={submitting || item.quantity === 0}
                            >
                                {submitting ? 'Collecting...' : 'Collect Equipment'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default CollectForm