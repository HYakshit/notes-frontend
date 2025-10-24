import { useRef, useEffect } from "react";
import * as notesApi from "../services/api";
import { AddNote } from "./common/AddNote";
import { useAuth } from "../hooks/AuthContext";
import { NoteCard } from "./common/NoteCard";

const Notes = ({ notes, loading, setNotes }) => {
  const { user } = useAuth();
  const modalRef = useRef();

  useEffect(() => {
    if (!user?.email) return;
    notesApi.fetchNotes().then((data) => setNotes(data));
  }, [user]);

  const handleAddNote = () => {
    setModalMode("add");
    setSelectedNote(null);
    modalRef.current.showModal();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      {!notes || notes.length === 0 ? (
        <>
          <AddNote handleClick={handleAddNote} />
          <div className="flex justify-center items-center h-screen">
            No notes available. Please add some notes.
          </div>
        </>
      ) : (
        <>
          <AddNote />
          <NoteCard notes={notes} setNotes={setNotes}></NoteCard>
        </>
      )}
    </>
  );
};

export default Notes;
