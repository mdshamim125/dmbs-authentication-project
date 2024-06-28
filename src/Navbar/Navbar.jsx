import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const handleDropDownProfile = () => setIsOpen(!isOpen);

  const displayName = user?.displayName || "";
  const photoURL =
    user?.photoURL ||
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg";

  const navLinks = (
    <>
      <li>
        <NavLink className="mr-3 text-base" to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className="mr-3 text-base" to="login">
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to="register" className="mr-3 text-base">
          Register
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-cyan-600">
      <div className="navbar container py-4 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="text-3xl font-bold cursor-pointer">
            <span className="text-blue-600">S </span>
            <span className="text-green-500">H</span>{" "}
            <span className="text-fuchsia-900">A</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          <div className="relative">
            <div
              onClick={handleDropDownProfile}
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img src={photoURL} alt="User Avatar" />
              </div>
            </div>
            {isOpen && (
              <ul
                tabIndex={0}
                className="absolute right-0 mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">{displayName}</a>
                </li>

                <li>
                  {user ? (
                    <button onClick={logOut}>Logout</button>
                  ) : (
                    <Link to="/login">Login</Link>
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
