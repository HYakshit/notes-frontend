
import { createContext, useContext, useState, useEffect } from "react";
import { me } from "../services/api";
// import { supabase } from "../services/supabase";
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
      } catch { }
      setLoading(false);

    })();
  }, []);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          try {
            await googleLogin(session.access_token );
            const userData = await me();
            setUser(userData);
          } catch (error) {
            console.error("Session sync failed", error);
          }
        }
      } 
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
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
