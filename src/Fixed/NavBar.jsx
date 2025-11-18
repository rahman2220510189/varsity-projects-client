import { Link, NavLink } from "react-router-dom";

import img from "../assets/img1.jpeg";
const NavBar = () => {
  const links = (
    <>
      <NavLink to="/" className="font-medium text-white hover:text-yellow-400">
        Home
      </NavLink>
      <NavLink
        to="/upload-equipment"
        className="font-medium text-white hover:text-yellow-400"
      >
        Add Equipment{" "}
      </NavLink>
      <NavLink to="/history" className="font-medium text-white hover:text-yellow-400">
        History
      </NavLink>
    
      <NavLink to="/adminPanel" className="font-medium text-white hover:text-yellow-400">
        Update & Delete Equipment
      </NavLink>
      <NavLink to="/due-equipment" className="font-medium text-white hover:text-yellow-400">
        Due Equipment
      </NavLink>
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
              {links}
              {/* <li>
                <Link to="/signin" className="hover:text-yellow-400 font-medium">Sign In</Link>
              </li> */}
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
          <ul className="menu menu-horizontal px-1 space-x-4">{links}</ul>
        </div>

        <div className="navbar-end hidden lg:flex pr-4">
          <Link
            to="/signin"
            className="px-4 py-2 border border-yellow-400 rounded-full text-yellow-400 hover:bg-yellow-400 hover:text-black transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
