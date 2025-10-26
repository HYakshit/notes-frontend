import { useRef, useState } from "react";
import Modal from "./Modal";
import * as notesApi from "../../services/api";
import { useNotes } from "../../hooks/useNotes";
import { useNavigate } from "react-router-dom";

export const AddNote = ({ justifyDirection = "end" }) => {
  const navigate = useNavigate();
  const { setNotes } = useNotes(false);
  const [user, setUser] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const [selectedNote, setSelectedNote] = useState(null);
  const modalRef = useRef();
  const handleAddNote = () => {
    if (!user) {
      navigate("/");
      return;
    }
    setModalMode("add");
    setSelectedNote(null);
    modalRef.current.showModal();
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
        onNoteAdded={() => notesApi.fetchNotes().then((data) => setNotes(data))}
        onNoteUpdated={() =>
          notesApi.fetchNotes().then((data) => setNotes(data))
        }
      />
    </>
  );
};
