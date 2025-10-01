import { useRef } from "react";
import "./App.css";
import Notes from "./components/notes";
import { useNotes } from "./hooks/useNotes";
import { useState } from "react";
import Modal from "./components/Modal";
import { Navbar } from "./components/Navbar";
import { NoteBar } from "./components/noteBar";

function App() {
  const { notes, loading, setNotes } = useNotes();
  // const { modal, SetModal } = useState(false);

  return (
    <>
    <Navbar></Navbar>
   
      <Notes notes={notes} setNotes={setNotes} loading={loading}></Notes>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
     
    </>
  );
}

export default App;
