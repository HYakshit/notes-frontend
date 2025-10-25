import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";
import { useNotes } from "./hooks/useNotes";
import { Navbar } from "./components/common/Navbar";
import { PinedNotes } from "./components/PinedNotes";
import { Home } from "./components/Home";
import Notes from "./components/Notes";
import { Profile } from "./components/Profile";
import ResetPassword from "./components/ResetPassword";
import { AuthProvider } from "./hooks/AuthContext";
import isNotesRoute from "./utill/checkRoute";

function App() {
  const isNotes = isNotesRoute();
  const { notes, loading, setNotes } = useNotes(isNotes);

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
