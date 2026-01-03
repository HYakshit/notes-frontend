import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { logout } from "../../services/api";
import { fetchNotes } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import { useNotes } from "../../hooks/NotesContext";
import { supabase } from '../../services/supabase';

export const LogoutBtn = ({
  width = "full",
  fontsize = "md",
  p = "3",
  mt = "4",
}) => {
  const { setNotes } = useNotes(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

const handleLogout = async () => {
    try {
      // 1. Sign out of Supabase (Clears LocalStorage)
      await supabase.auth.signOut(); 
      
      // 2. Call your backend logout (Clears Server Cookie)
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
      <FaSignOutAlt className="text-white" />
    </button>
  );
};
