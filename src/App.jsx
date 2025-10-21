import "./App.css";

import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useNotes } from "./hooks/useNotes";
import { Navbar } from "./components/Navbar";
import { PinedNotes } from "./components/PinedNotes";
import { Home } from "./components/Home";
import Notes from "./components/Notes";
import { setUnauthorizedHandler } from "./services/api";
import { Profile } from "./components/Profile"; 
import ResetPassword from "./components/ResetPassword";

function App() {
    const { notes, loading, setNotes } = useNotes();
  const navigate = useNavigate();

  useEffect(() => {
    setUnauthorizedHandler(() => {
      navigate("/");
    });
  }, [navigate]);
  return (
   
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
   
  );
}

export default App;
