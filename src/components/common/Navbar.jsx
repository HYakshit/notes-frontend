import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import profileImg from "../../assets/profile.png";
import { useAuth } from "../../hooks/AuthContext";
import { LogoutBtn } from "./LogoutBtn";
import { PROJECT_NAME } from "../../utill/constants";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, loading } = useAuth();
  
  // Theme state initialization
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Dark Mode Effect
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="navbar text-black  bg-amber-200 dark:bg-gray-900 dark:text-white transition-colors duration-300 shadow-sm px-4">
      {/* Mobile Navbar */}
      <div className="navbar-start flex items-center gap-4">
        <div className="dropdown lg:hidden">
          <div tabIndex={0} className="btn btn-ghost">
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
            className="menu menu-sm dropdown-content dark:bg-gray-600 bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link className="hover:bg-amber-300 border-0 dark:hover:bg-gray-500" to="/notes">
                All Notes
              </Link>
            </li>
            <li>
              <Link className="hover:bg-amber-300 border-0 dark:hover:bg-gray-500" to="/pinned">
                Pinned Notes
              </Link>
            </li>
          </ul>
        </div>

        <Link to="/notes" className="btn hover:bg-amber-300 border-0 dark:hover:bg-gray-500 btn-ghost text-xl">
         {PROJECT_NAME}
        </Link>
      </div>

      {/* Desktop Navbar */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu dark:bg-black-100 menu-horizontal px-1 gap-4">
          <li>
            <Link to="/notes" className="btn btn-ghost hover:bg-amber-300 border-0 dark:hover:bg-gray-500 text-base">
              All Notes
            </Link>
          </li>
          <li>
            <Link to="/pinned" className="btn btn-ghost hover:bg-amber-300 border-0 dark:hover:bg-gray-500 text-base">
              Pinned Notes
            </Link>
          </li>
        </ul>
      </div>

      {/* Theme Toggle & Profile */}
      <div className="navbar-end flex items-center gap-4 relative" ref={dropdownRef}>
        
        {/* Toggle Button */}
        <button 
          onClick={toggleTheme} 
          className="btn btn-ghost btn-circle hover:bg-amber-300 dark:hover:bg-gray-700 transition-all text-2xl"
        >
          {theme === "dark" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </button>

        <img
          src={user?.user_metadata?.picture || profileImg}
          alt="Profile"
          className="w-10 h-10 dark:bg-blue-500 rounded-full cursor-pointer object-cover"
          onClick={toggleDropdown}
          width={40}
          height={40}
        />

        {dropdownOpen && (
          <div className="absolute right-0 top-16 w-60 bg-white dark:bg-gray-600 dark:text-white rounded shadow-lg z-20">
              <Link
              to="/Profile"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-500 cursor-pointer"
            >
            <div className="flex items-center p-4 gap-3">
              <img
                src={profileImg}
                alt="Profile"
                className="w-10 dark:bg-blue-500 h-10 rounded-full filter object-cover"
                width={40}
                height={40}
            />
           
              <div className="text-left">
                <p className=" font-semibold text-sm">
                  {user?.user_metadata?.name ?? "Guest"}
                </p>
                <p className=" text-xs truncate w-28">
                  {user?.email ?? "Guest Email"}
                </p>
              </div>
            
            </div>
            </Link>
            <hr className="dark:border-gray-500" />

           
              
            <hr className="dark:border-gray-500" />
          
              {user && !loading ? (
                  <div className="px-4 py-2">
                <LogoutBtn width="full" fontsize="sm" p="1" mt="0"></LogoutBtn>
                </div>
              ) : (
                   <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <Link to="/">Login</Link>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
};

