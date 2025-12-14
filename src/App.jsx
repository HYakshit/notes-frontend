import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";
import { useNotes } from "./hooks/useNotes";
import { Navbar } from "./components/common/Navbar";
import { PinedNotes } from "./components/PinedNotes";
import { LoginRegister } from "./components/LoginRegister";
import Notes from "./components/Notes";
import { Profile } from "./components/Profile";
import ResetPassword from "./components/ResetPassword";
import { AuthProvider } from "./hooks/AuthContext";
import isNotesRoute from "./utill/checkRoute";
import Footer from "./components/common/Footer";
import { ErrorBar } from "./components/common/ErrorBar";

// function App() {
//   const isNotes = isNotesRoute();
//   const { notes, loading, setNotes } = useNotes(isNotes);

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <ErrorBar />
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route
          path="/notes"
          element={<Notes />}
        />
        <Route
          path="/pinned"
          element={<PinedNotes />}
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
