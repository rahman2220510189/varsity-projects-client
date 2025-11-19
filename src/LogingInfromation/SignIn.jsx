import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; 
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { AuthContext } from "../firebase/Provider/AuthProviders";

const SignIn = () => { 
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState(""); 
    const navigate = useNavigate();
    
    const { createUser, googleSignIn } = useContext(AuthContext); 
    const axiosPublic = useAxiosPublic();

    // Strong password validation
    const isStrongPassword = (pass) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pass);
    };
    
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
    
    // Handle email/password signup
    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const formPassword = e.target.password.value;

        // Validate password strength
        if (!isStrongPassword(formPassword)) {
            alert("Weak Password: Password must be 8+ characters, contain upper/lowercase & a number");
            return;
        }

        try {
            // Create Firebase user
            const result = await createUser(email, formPassword);
            const user = result.user;
            console.log("Firebase User:", user);
            
            // Generate JWT token
            await generateToken(user.email);
            
            // Save user to MongoDB
            const userInfo = { 
                email: user.email, 
                name: user.displayName || email.split('@')[0] 
            };
            
            const dbResponse = await axiosPublic.post('/api/users', userInfo);
            console.log('User saved to DB:', dbResponse.data);
            
            // Navigate to home
            navigate("/");
            
        } catch (error) {
            console.error("Signup Error:", error);
            alert(error.message || "Signup failed. Please try again.");
        }
    };

    // Handle Google signup
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
            
            const dbResponse = await axiosPublic.post('/api/users', userInfo);
            console.log('Google user saved to DB:', dbResponse.data);
            
            // Navigate to home
            navigate("/");
            
        } catch (error) {
            console.error("Google Signin Error:", error);
            alert(error.message || "Google signup failed. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
                    ✍️ Create Account
                </h2>

                {/* Google Signup Button */}
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
                    <span>Sign Up with Google</span>
                </button>

                {/* Divider */}
                <div className="relative flex justify-center text-sm mb-6">
                    <span className="px-3 bg-white text-gray-500 z-10">
                        Or sign up with email
                    </span>
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                </div>

                {/* Signup Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all outline-none"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full pr-12 px-4 py-3 border-2 ${
                                password && isStrongPassword(password)
                                    ? "border-green-300 focus:border-green-500 focus:ring-green-100"
                                    : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                            } rounded-xl focus:ring-4 transition-all outline-none`}
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
                    
                    {/* Password Strength */}
                    {password && (
                        <div className={`text-sm font-medium ${isStrongPassword(password) ? 'text-green-600' : 'text-red-500'}`}>
                            {isStrongPassword(password) ? (
                                <span className="flex items-center gap-1">✓ Strong password</span>
                            ) : (
                                <span>Password must be 8+ chars, contain upper/lowercase & number</span>
                            )}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl transition-all duration-300 font-semibold text-lg"
                    >
                        Create Account
                    </button>
                </form>

                {/* Login Link */}
                <div className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?
                    <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 transition duration-150 ml-1">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
