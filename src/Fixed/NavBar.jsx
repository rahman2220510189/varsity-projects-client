import { Link, NavLink, useLocation } from "react-router-dom";

import img from "../assets/img1.jpeg";
import { useContext } from "react";
import { AuthContext } from "../firebase/Provider/AuthProviders";
import useAdminCheck from "../Hooks/useAdminCheck";
import { FaUserShield } from "react-icons/fa";
const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();

  const[isAdmin, isAdminLoading] = useAdminCheck();


  const handleLogout = () => {
    logOut().then(() => {
      console.log("logged out");
    });
  };
  const commonLinks =(
    <>
    <NavLink to="/" className="font-medium text-white hover:text-yellow-400">
                Home
            </NavLink>
            <NavLink to="/history" className="font-medium text-white hover:text-yellow-400">
                Activities
            </NavLink>
            <NavLink to="/my-history" className="font-medium text-white hover:text-yellow-400">
                My History
            </NavLink>
            
           
    </>
  );
   const adminAccessLink = user && isAdmin ? (
    <NavLink 
    to="/admin-dashboard-access" 
    className="font-medium px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700 transition duration-300"
    >
        <FaUserShield className="inline mr-1"/> Admin Panel
    </NavLink>
  ):null


  
  

  

  const finalLinks = (
    <>
    {commonLinks}
    {adminAccessLink} 
    </>
  );
 

  return (
    <div className="w-full bg-gradient-to-r from-indigo-700 via-purple-800 to-black fixed top-0 z-50 shadow-md px-4 sm:px-6 lg:px-8">
      <div className="navbar max-w-[1280px] mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-[#031528] rounded-box w-52 space-y-2"
            >
              {finalLinks}
              <li>
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 font-extrabold text-white px-5 py-2 rounded-lg shadow-xl 
                             hover:bg-red-700 hover:shadow-2xl transition duration-300 transform hover:scale-105">
                  
                    Log Out
                  </button>
                ) : (
                  <Link
                    to="login" state={{from: location}}replace
                    className="w-full font-extrabold text-center px-5 py-2 rounded-lg shadow-xl text-white block 
                           bg-gradient-to-r from-blue-600 to-indigo-600 
                           hover:from-blue-700 hover:to-indigo-700 
                           transition duration-300"
                  >
                    Sign In
                  </Link>
                )}
              </li>
            </ul>
          </div>
          <Link
            to="/"
            className="btn btn-ghost text-xl font-bold tracking-tight"
          >
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
              <img className="rounded-full w-10 h-10" src={img} alt="" />
            </div>

            <div>
              <h1 className="text-lg font-semibold bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent">
                DIU EMBEDDED LAB
              </h1>
              <p className="text-xs bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent -mt-1">
                Inventory Management System
              </p>
            </div>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4">{finalLinks}</ul>
        </div>

        <div className="navbar-end hidden lg:flex pr-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 font-extrabold text-white px-5 py-2 rounded-lg shadow-xl 
hover:bg-red-700 hover:shadow-2xl transition duration-300 transform hover:scale-105"
            >
              Log Out
            </button>
          ) : (
            <Link state={{from: location}}replace
              to="login"
              className="font-extrabold px-5 py-2 rounded-lg shadow-xl text-white 
                           bg-gradient-to-r from-blue-600 to-indigo-600 
                           hover:from-blue-700 hover:to-indigo-700 
                           transition duration-300 transform hover:scale-105"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
