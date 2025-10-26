import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import profileImg from "../../assets/profile.png";
import { useAuth } from "../../hooks/AuthContext";
import { LogoutBtn } from "./LogoutBtn";
import { PROJECT_NAME } from "../../utill/constants";

export const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user, loading } = useAuth();
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

  return (
    <div className="navbar text-black  navbar-bg shadow-sm px-4">
      {/* Mobile Navbar */}
      <div className="navbar-start  flex items-center gap-4">
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
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link className="btn-hover" to="/notes">
                All Notes
              </Link>
            </li>
            <li>
              <Link className="btn-hover" to="/pinned">
                Pinned Notes
              </Link>
            </li>
          </ul>
        </div>

        <Link to="/notes" className="btn btn-hover btn-ghost text-xl">
         {PROJECT_NAME}
        </Link>
      </div>

      {/* Desktop Navbar */}

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          <li>
            <Link to="/notes" className="btn btn-ghost btn-hover text-base">
              All Notes
            </Link>
          </li>
          <li>
            <Link to="/pinned" className="btn btn-ghost btn-hover text-base">
              Pinned Notes
            </Link>
          </li>
        </ul>
      </div>
      {/* profile */}
      <div className="navbar-end relative text-black" ref={dropdownRef}>
        <img
          src={profileImg}
          alt="Profile"
          className="w-10 h-10 text-black  rounded-full cursor-pointer"
          onClick={toggleDropdown}
        />

        {dropdownOpen && (
          <div className="absolute right-0 mt-52 w-60 bg-white rounded shadow-lg z-20">
            <div className="flex items-center p-4 gap-3">
              <img
                src={profileImg}
                alt="Profile"
                className="w-10 h-10 rounded-full filter brightness-0"
              />
              <div className="text-left">
                <p className="text-black font-semibold text-sm">
                  {user?.user_metadata?.display_name ?? "Guest"}
                </p>
                <p className="text-gray-500 text-xs">
                  {user?.email ?? "Guest Email"}
                </p>
              </div>
            </div>
            <hr />

            <Link
              to="/Profile"
              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Profile
            </Link>
            <hr />

          
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
