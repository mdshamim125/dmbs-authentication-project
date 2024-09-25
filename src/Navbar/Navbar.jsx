import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false); // State for small devices navbar

  const handleDropDownProfile = () => setIsProfileOpen(!isProfileOpen);
  const handleDropDownNav = () => setIsNavOpen(!isNavOpen); // Function for mobile nav dropdown

  const displayName =
    (user?.displayName && user?.emailVerified === true && user?.displayName) ||
    "";
  const photoURL =
    (user?.photoURL && user?.emailVerified === true && user?.photoURL) ||
    "https://i.ibb.co/3BY9Fks/profile.png"; // Replace with your default profile URL

  const navLinks = (
    <>
      <li>
        <NavLink
          className="mr-3 text-base hover:text-gray-900"
          to="/"
          activeClassName="text-indigo-600"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className="mr-3 text-base hover:text-gray-900"
          to="login"
          activeClassName="text-indigo-600"
        >
          Login
        </NavLink>
      </li>
      <li>
        <NavLink
          to="register"
          className="mr-3 text-base hover:text-gray-900"
          activeClassName="text-indigo-600"
        >
          Register
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-gray-100 border-b border-gray-200">
      <div className="navbar container py-2 mx-auto">
        {/* Left section with logo and hamburger */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              onClick={handleDropDownNav} // Toggle mobile dropdown
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {isNavOpen && (
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
              >
                {navLinks}
              </ul>
            )}
          </div>
          <Link
            to="/"
            className="text-2xl font-bold cursor-pointer text-gray-800"
          >
            <span className="text-indigo-600">SHA</span>
          </Link>
        </div>

        {/* Center section for large screens */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        {/* Right section with profile dropdown */}
        <div className="navbar-end">
          <div className="relative">
            <div
              onClick={handleDropDownProfile}
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar transition-transform duration-300 hover:scale-105"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 shadow-lg">
                <img
                  src={photoURL}
                  alt="User Avatar"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            {isProfileOpen && (
              <ul
                tabIndex={0}
                aria-labelledby="profile-dropdown"
                className="absolute right-0 mt-3 p-2 shadow-xl menu menu-sm dropdown-content bg-white rounded-lg border border-gray-200 w-52 transition-all duration-300 ease-in-out"
              >
                <li className="p-2">
                  <span className="font-semibold text-gray-800">
                    {displayName}
                  </span>
                </li>
                <li>
                  <hr className="border-gray-200 my-1" />
                </li>
                <li>
                  {user && user?.emailVerified === true ? (
                    <button
                      onClick={logOut}
                      className="text-left w-full hover:bg-gray-100 px-4 py-2 flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12H8m8 4l-4 4m0 0l-4-4m4 4V8"
                        />
                      </svg>
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="flex items-center hover:bg-gray-100 px-4 py-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12H9m0 0L6 9m3 3l-3 3m9-3a3 3 0 00-3-3 3 3 0 00-3 3 3 3 0 003 3 3 3 0 003-3z"
                        />
                      </svg>
                      Login
                    </Link>
                  )}
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
