import React, { useContext, useState } from "react"; // Added useState
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../firebase/Provider/AuthProviders";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Added icons

const LogInnForm = () => {
    const [showPassword, setShowPassword] = useState(false); // Added state
    const navigate = useNavigate();
    const { signIn, googleSignIn } = useContext(AuthContext);

    const handleGoogleLogin = () => {
        googleSignIn()
            .then((result) => {
                const loggedUser = result.user;
                console.log("Google user:", loggedUser);
                navigate("/");
            })
            .catch((error) => {
                console.error("Google Signin Error:", error);
                alert(error.message);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        signIn(email, password)
            .then((result) => {
                const user = result.user;
                console.log(user);
                navigate("/");
            })
            .catch((error) => {
                console.error("Login Error:", error);
                alert(error.message);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
                    👋 Welcome Back
                </h2>

                <button 
                    onClick={handleGoogleLogin} 
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150 mb-6"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.5-.2-2.22h-10.3v4.1h5.92c-.27 1.34-1.05 2.58-2.23 3.48l-1.07.82V20c2.89-2.67 4.54-6.6 4.54-10.12zm-4.73-4.8c1.33-1.22 2.21-2.91 2.21-4.83H12.03v4.1h5.81zM3.92 12c0 1.34.37 2.6.99 3.65L7 17.5l2.48-1.92c-.62-1.05-.99-2.31-.99-3.65s.37-2.6.99-3.65L7 6.5l-2.09 1.85c-.62 1.05-.99 2.31-.99 3.65zM12.03 3.99c2.05 0 3.73.72 5.04 1.95L15.01 7.64c-.81-.72-1.85-1.1-2.98-1.1H12.03V3.99z" />
                    </svg>
                    <span>Sign in with Google</span>
                </button>

                <div className="relative flex justify-center text-sm mb-6">
                    <span className="px-2 mb-1 bg-white text-gray-500">
                        Or continue with
                    </span>
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t mb-8 border-gray-300"></div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                            placeholder="enter your email"
                        />
                    </div>

                    <div className="relative"> {/* Added relative for positioning eye icon */}
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            // Type changes based on showPassword state
                            type={showPassword ? "text" : "password"}
                            required
                            className="mt-1 w-full pr-12 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                            placeholder="enter your password"
                        />
                        {/* Eye Icon Button */}
                        <div
                            className="absolute top-9 right-4 text-gray-500 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
                        </div>
                    </div>

                    <div className="flex justify-end text-sm">
                        <a
                            href="#"
                            className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150"
                        >
                            Forgot your password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 text-white font-semibold rounded-lg shadow-md 
                                     bg-gradient-to-r from-blue-600 to-purple-600 
                                     hover:from-blue-700 hover:to-purple-700 
                                     focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                                     transition duration-300"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?
                    <Link
                        to="/signup"
                        className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150"
                    >
                        Create Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LogInnForm;