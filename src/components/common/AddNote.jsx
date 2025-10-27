import { useRef, useState } from "react";
import Modal from "./Modal";
import * as notesApi from "../../services/api";
import { useNotes } from "../../hooks/useNotes";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";

export const AddNote = ({ justifyDirection = "end", setNotes }) => {
  const navigate = useNavigate();
  const { setNotes: localSetNotes } = useNotes(false);
  const { user } = useAuth();
  const [modalMode, setModalMode] = useState("add");
  const [selectedNote, setSelectedNote] = useState(null);
  const modalRef = useRef();

  // Use the setNotes from props if provided, otherwise use local one
  const updateNotes = setNotes || localSetNotes;

  const handleAddNote = () => {
    if (!user) {
      navigate("/");
      return;
    }
    setModalMode("add");
    setSelectedNote(null);
    modalRef.current.showModal();
  };

  const handleNoteAdded = async () => {
    return notesApi.fetchNotes().then((data) => updateNotes(data));
  };

  const handleNoteUpdated = async () => {
    return notesApi.fetchNotes().then((data) => updateNotes(data));
  };

  return (
    <>
      <div className={`flex justify-${justifyDirection} bg-gray-100 p-4`}>
        <button className="btn btn-primary" onClick={handleAddNote}>
          Add Note
        </button>
      </div>
      {/* Add/Edit Modal */}
      <Modal
        fields={selectedNote}
        ref={modalRef}
        mode={modalMode}
        onNoteAdded={handleNoteAdded}
        onNoteUpdated={handleNoteUpdated}
      />
    </>
  );
};
