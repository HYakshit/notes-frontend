import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../services/api";
import { fetchNotes } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import { useNotes } from "../../hooks/useNotes";
import isNotesRoute from "../../utill/checkRoute";

export const LogoutBtn = ({
  width = "full",
  fontsize = "md",
  p = "3",
  mt = "4",
}) => {
  const { setNotes } = useNotes(isNotesRoute);
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setNotes([]);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <button
      onClick={handleLogout}
      className={`w-${width} bg-red-500 hover:bg-red-600 text-white p-${p} rounded-lg mt-${mt} font-${fontsize} flex items-center justify-center gap-2 cursor-pointer`}
    >
      Logout
      <LogoutIcon style={{ color: "white" }} />
    </button>
  );
};
