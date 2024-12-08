import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FaTimes } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineScreenSearchDesktop, MdAccountCircle } from "react-icons/md";
import { Button } from '@mui/material';

function UserHeader() {
  const user = JSON.parse(localStorage.getItem("user")); // Get user data from localStorage
  const userId = user ? user.userId : null; // Extract userId if available
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload(); // Refresh the page to clear the user's state
  };

  const handleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const navItems = [
    { title: 'Product', path: '/jewelery' },
    { title: 'Solutions', path: '/ed' },
    { title: 'Enterprise', path: '/d' },
    { title: 'Pricing', path: '/s' },
    { title: 'Resources', path: '/r' },
  ];

  return (
    <div>
      {/* Mobile menu toggle button */}
      <div className="sm:hidden md:hidden xl:hidden mt-5 ml-6">
        <button onClick={handleMenu}>
          {menuOpen ? <FaTimes /> : <CiMenuFries className="w-5 h-5 text-black" />}
        </button>
      </div>

      <header className="w-3.01/4 xl:px-28 xl:ml-20 px-4 sm:ml-8 mx-auto">
        <nav className="flex justify-between items-center mx-auto md:py-4 pt-6 pb-3">
          {/* Logo */}
          <Link to="/" className="flex items-center text-lg font-bold">
            <MdOutlineScreenSearchDesktop className="mr-2" /> Meet.Sol
          </Link>

          {/* Buttons: Get Started and Login/Logout */}
          <div className="text-lg text-black flex items-center sm:gap-4 gap-0">
            {/* Show + New Meeting button only if user is logged in */}
            {userId && (
              <Button className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300">
                <Link
                  className="sm:flex items-center mr-2 sm:mr-0"
                  to={`/${userId}/newMeeting`}
                >
                  New Meeting
                </Link>
              </Button>
            )}

            {!userId && (
              <Button className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 hover:text-white transition-all duration-300">
                <Link className="sm:flex items-center mr-2 sm:mr-0" to="/register">
                  GET STARTED
                </Link>
              </Button>
            )}

            {userId ? (
              <Button className="p-2 bg-red-600 text-white rounded-md hover:bg-red-500 hover:text-white transition-all duration-300">
                <Link
                  onClick={handleLogOut}
                  className="sm:flex items-center gap-2 ml-3 sm:ml-0"
                >
                  <MdAccountCircle className="ml-4" /> Log out
                </Link>
              </Button>
            ) : (
              <Button className="p-2 bg-green-600 text-white rounded-md hover:bg-green-500 hover:text-black transition-all duration-300">
                <Link className="sm:flex items-center gap-2" to="/login">
                  <MdAccountCircle className="ml-4" /> Log In
                </Link>
              </Button>
            )}
          </div>
        </nav>
        <hr />

        {/* Desktop navigation menu */}
        <div className="pt-4">
          <ul className="lg:flex items-center justify-center text-black hidden gap-5">
            {navItems.map(({ title, path }) => (
              <li
                key={title}
                className="p-2 rounded-md shadow-md lg:shadow-lg lg:text-lg lg:hover:bg-green-400 lg:hover:text-white lg:hover:scale-105 lg:transition-transform lg:duration-300"
              >
                <Link to={path}>{title}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile navigation menu */}
        <div>
          <ul
            className={`bg-black text-white fixed top-10 left-0 h-2/4 w-64 px-4 py-2 rounded-lg transition-transform ease-in-out duration-500 transform ${
              menuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {navItems.map(({ title, path }) => (
              <li
                key={title}
                className="hover:text-orange-500 font-semibold my-3 cursor-pointer"
              >
                <Link className="text-right" to={path}>
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <Outlet />
    </div>
  );
}

export default UserHeader;
