import { createContext, useContext, useState, useEffect } from "react";
import { me } from "../services/api"; 
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const userData = await me();
        if (!userData?.email) Navigate("/login");
        if (userData?.email) setUser(userData);
      } catch {}
      setLoading(false);
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
