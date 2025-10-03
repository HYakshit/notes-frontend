import "./App.css";
import Notes from "./components/notes";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNotes } from "./hooks/useNotes";
import { Navbar } from "./components/Navbar";
import { PinedNotes } from "./components/PinedNotes";
import { Home } from "./components/Home";

function App() {
  const { notes, loading, setNotes } = useNotes();
  // const { modal, SetModal } = useState(false);

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/all"
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
