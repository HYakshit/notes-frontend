import React from "react";
import profileImg from "../assets/profile.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../services/api";
export const Profile = () => {
  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-5">
      <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md text-center">
        <img
          src={profileImg}
          alt="Profile"
          className="w-16 h-16 rounded-full mx-auto filter brightness-0"
        />

        <div className="mt-4">
          <p className="text-gray-500 text-sm font-semibold">Username</p>
          <p className="text-black text-lg font-medium">John Doe</p>
        </div>
        <hr className="my-4" />

        <div>
          <p className="text-gray-500 text-sm font-semibold">Email</p>
          <p className="text-black text-lg font-medium">johndoe@example.com</p>
        </div>
        <hr className="my-4" />

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white p-3 rounded-lg mt-4 font-medium flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogoutIcon style={{ color: "white" }} />
          Logout
        </button>
      </div>
    </div>
  );
};
