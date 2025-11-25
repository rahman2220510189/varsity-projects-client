import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMail, AiOutlineArrowLeft } from 'react-icons/ai';
import { AuthContext } from "../firebase/Provider/AuthProviders";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const { resetPassword } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setLoading(true);

        try {
            await resetPassword(email);
            setMessage("Password reset email sent! Check your inbox.");
            setEmail(""); // Clear the input
        } catch (error) {
            console.error("Password reset error:", error);
            
            // Handle different error types
            if (error.code === 'auth/user-not-found') {
                setError("No account found with this email address.");
            } else if (error.code === 'auth/invalid-email') {
                setError("Invalid email address.");
            } else {
                setError("Failed to send reset email. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
                {/* Back to Login Link */}
                <Link 
                    to="/login" 
                    className="flex items-center text-blue-600 hover:text-blue-700 mb-6 transition duration-150"
                >
                    <AiOutlineArrowLeft className="mr-2" size={20} />
                    <span className="font-medium">Back to Login</span>
                </Link>

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                            <AiOutlineMail className="text-blue-600" size={32} />
                        </div>
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-800 mb-2">
                        Forgot Password?
                    </h2>
                    <p className="text-gray-600 text-sm">
                        No worries! Enter your email and we'll send you reset instructions.
                    </p>
                </div>

                {/* Success Message */}
                {message && (
                    <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-lg">
                        <p className="text-green-700 text-sm font-medium">{message}</p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                        <p className="text-red-700 text-sm font-medium">{error}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                            placeholder="Enter your email"
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Sending..." : "Send Reset Link"}
                    </button>
                </form>

                {/* Additional Info */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Remember your password?{' '}
                        <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition duration-150">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;