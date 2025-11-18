import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../firebase/Provider/AuthProviders"; 
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Added icons

const SignIn = () => { 
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState(""); 
    const navigate = useNavigate();
    
    const { createUser, googleSignIn } = useContext(AuthContext); 

    const isStrongPassword = (pass) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(pass);
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const formPassword = e.target.password.value;
        console.log(email, formPassword);

        createUser(email, formPassword)
            .then((result) => {
                const user = result.user;
                console.log(user);
                
                if (isStrongPassword(formPassword)) {
                    navigate("/"); 
                } else {
                    alert("Weak Password: Password must be 8+ characters, contain upper/lowercase & a number");
                }
            })
            .catch(error => {
                console.error("Signup Error:", error);
                alert(error.message); 
            });
    };

    const handleGoogleLogin = () => {
        googleSignIn()
            .then((result) => {
                const loggedUser = result.user;
                console.log("Google user:", loggedUser);
                navigate("/"); 
            })
            .catch(error => {
                console.error("Google Signin Error:", error);
                alert(error.message);
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
                    ✍️ Create Account
                </h2>

                <button 
                    onClick={handleGoogleLogin} 
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150 mb-6"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.5-.2-2.22h-10.3v4.1h5.92c-.27 1.34-1.05 2.58-2.23 3.48l-1.07.82V20c2.89-2.67 4.54-6.6 4.54-10.12zm-4.73-4.8c1.33-1.22 2.21-2.91 2.21-4.83H12.03v4.1h5.81zM3.92 12c0 1.34.37 2.6.99 3.65L7 17.5l2.48-1.92c-.62-1.05-.99-2.31-.99-3.65s.37-2.6.99-3.65L7 6.5l-2.09 1.85c-.62 1.05-.99 2.31-.99 3.65zM12.03 3.99c2.05 0 3.73.72 5.04 1.95L15.01 7.64c-.81-.72-1.85-1.1-2.98-1.1H12.03V3.99z" />
                    </svg>
                    <span>Sign Up with Google</span>
                </button>

                <div className="relative flex justify-center text-sm mb-6">
                    <span className="px-2 mb-1 bg-white text-gray-500">
                        Or create an account with
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
                            type={showPassword ? "text" : "password"}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full pr-12 py-3 border ${
                                isStrongPassword(password)
                                    ? "border-green-500"
                                    : "border-red-400"
                            } rounded-xl focus:outline-none text-gray-700`}
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
                    
                    {password && (
                        <p className={`text-sm ${isStrongPassword(password) ? 'text-green-600' : 'text-red-500'}`}>
                            {isStrongPassword(password)
                                ? 'Strong password '
                                : 'Password must be 8+ chars, contain upper/lowercase & number'}
                        </p>
                    )}

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
                        className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition duration-300 font-semibold"
                    >
                        Create Account
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    Already have an account?
                    <Link
                        to="/login"
                        className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-150"
                    >
                        {' '}Log in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;