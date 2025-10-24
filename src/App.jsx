import "./App.css";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { createContext, use, useEffect } from "react";
import { useNotes } from "./hooks/useNotes";
import { Navbar } from "./components/common/Navbar";
import { PinedNotes } from "./components/PinedNotes";
import { Home } from "./components/Home";
import Notes from "./components/Notes";
import { me, setUnauthorizedHandler } from "./services/api";
import { Profile } from "./components/Profile";
import ResetPassword from "./components/ResetPassword";
import { AuthProvider } from "./hooks/AuthContext";

function App() {
  const location = useLocation();
  const isNotesRoute = location.pathname === "/notes" || location.pathname === "/pinned";
  const { notes, loading, setNotes } = useNotes(isNotesRoute);
  const navigate = useNavigate();
  const AuthContext = createContext();

  // useEffect(() => {
  //   setUnauthorizedHandler(() => {
  //     navigate("/");
  //   });
  // }, [navigate]);

  return (
    <AuthProvider>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/notes"
            element={
              <Notes notes={notes} setNotes={setNotes} loading={loading} />
            }
          />
          <Route
            path="/pinned"
            element={
              <PinedNotes notes={notes} setNotes={setNotes} loading={loading} />
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
