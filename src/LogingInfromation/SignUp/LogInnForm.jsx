import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; 
import { AuthContext } from "../../firebase/Provider/AuthProviders";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const LogInnForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    
    const { signIn, googleSignIn } = useContext(AuthContext); 
    const axiosPublic = useAxiosPublic();

    // Generate JWT token
    const generateToken = async (email) => {
        try {
            const res = await axiosPublic.post('/jwt', { email });
            if (res.data?.token) {
                localStorage.setItem('access-token', res.data.token);
                console.log('JWT token generated and saved');
            }
        } catch (error) {
            console.error('Error generating token:', error);
        }
    };
    
    // Handle email/password login
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            // Sign in with Firebase
            const result = await signIn(email, password);
            const user = result.user;
            console.log("Logged in user:", user);
            
            // Generate JWT token
            await generateToken(user.email);
            
            // Navigate to original page or home
            navigate(from, { replace: true });
            
        } catch (error) {
            console.error("Login Error:", error);
            alert(error.message || "Login failed. Please check your credentials.");
        }
    };

    // Handle Google login
    const handleGoogleLogin = async () => {
        try {
            const result = await googleSignIn();
            const loggedUser = result.user;
            console.log("Google user:", loggedUser);
            
            // Generate JWT token
            await generateToken(loggedUser.email);
            
            // Save user to MongoDB
            const userInfo = { 
                email: loggedUser.email, 
                name: loggedUser.displayName || loggedUser.email.split('@')[0]
            };
            
            await axiosPublic.post('/api/users', userInfo);
            
            // Navigate to original page or home
            navigate(from, { replace: true });
            
        } catch (error) {
            console.error("Google Login Error:", error);
            alert(error.message || "Google login failed. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
                    🔐 Welcome Back
                </h2>

                {/* Google Login Button */}
                <button 
                    onClick={handleGoogleLogin} 
                    className="w-full flex items-center justify-center space-x-3 px-4 py-3 border-2 border-gray-300 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 hover:shadow-lg transition-all duration-200 mb-6"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span>Continue with Google</span>
                </button>

                {/* Divider */}
                <div className="relative flex justify-center text-sm mb-6">
                    <span className="px-3 bg-white text-gray-500 z-10">Or login with email</span>
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password */}
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            className="w-full pr-12 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none"
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-11 text-gray-500 hover:text-gray-700 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <AiFillEyeInvisible size={22} /> : <AiFillEye size={22} />}
                        </button>
                    </div>

                    {/* Forgot Password */}
                    <div className="flex justify-end text-sm">
                        <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-700 transition duration-150">
                            Forgot password?
                        </Link>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl transition-all duration-300 font-semibold text-lg"
                    >
                        Login
                    </button>
                </form>

                {/* Signup Link */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?
                    <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700 transition duration-150 ml-1">
                        Create account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LogInnForm;