
import { useRef, useState } from "react";
import axios from "axios";
import * as notesApi from "../../services/api";
import Modal from "./Modal";
import { AddNote } from "./AddNote";
import { NoteCard } from "./NoteCard";

export const NotesGrid = ({ notes, setNotes, isPinned }) => {
  const [modalMode, setModalMode] = useState("add");
  const [selectedNote, setSelectedNote] = useState(null);
  const [open, setOpenNotes] = useState([]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [noteToView, setNoteToView] = useState(null);
  const [buttonLoading, setButtonLoading] = useState({
    view: null,
    edit: null,
    delete: null,
    pin: null,
  });
  const pinnedNotes = notes?.filter((note) => note.pinned);
  const otherNotes = notes?.filter((note) => !note.pinned);
  const noteIds = notes?.map((note) => note.id);
  const modalRef = useRef();
  
    function handleNoteClick(id) {
      setOpenNotes((prev) =>
        prev.includes(id) ? prev.filter((noteId) => noteId !== id) : [...prev, id]
      );
    }
  
    function handleAllExpand() {
      setOpenNotes(noteIds);
    }
  
  const pinNote = async (id) => {
    setButtonLoading((prev) => ({ ...prev, pin: id }));
    const note = notes.find((n) => n.id === id);
    const newPinState = !note.pinned;
    await axios.put(`/api/notes/${id}/pin`, { pinned: newPinState });
    const data = await notesApi.fetchNotes();
    setNotes(data);
    setButtonLoading((prev) => ({ ...prev, pin: null }));
  };

  const handleViewNote = (note) => {
    setNoteToView(note);
    setViewModalOpen(true);
  };

  const deleteNote = async (id) => {
    setButtonLoading((prev) => ({ ...prev, delete: id }));
    await notesApi.deleteNote(id);
    const data = await notesApi.fetchNotes();
    setNotes(data);
    setButtonLoading((prev) => ({ ...prev, delete: null }));
  };

  const handleEditNote = (note) => {
    setButtonLoading((prev) => ({ ...prev, edit: note.id }));
    setModalMode("edit");
    setSelectedNote(note);
    modalRef.current.showModal();
    setButtonLoading((prev) => ({ ...prev, edit: null }));
  };

  return (
    <div className=" min-h-screen bg-gray-100  dark:bg-gray-600 dark:text-white">
      <AddNote setNotes={setNotes} />
      <button className="btn btn-primary"  onClick={handleAllExpand}>Expand All</button>
      {/* pinned Notes */}
      {pinnedNotes.length > 0 && (
        <>
          <h4 className="p-4 font-bold uppercase" >Pinned</h4>
          <div className="grid items-start gap-4 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            {pinnedNotes.map((note) => (
              <NoteCard note={note} key={note.id} handleViewNote={handleViewNote} handleEditNote={handleEditNote} deleteNote={deleteNote} pinNote={pinNote} buttonLoading={buttonLoading} open={open} handleNoteClick={handleNoteClick}></NoteCard>
            ))}
          </div>
        </>
      )}
      {/* other Notes */}
      {!isPinned && otherNotes.length > 0 && (
        <>
          <h4 className="p-4 font-bold uppercase" >Others</h4>
          <div className="grid items-start gap-4 p-4 grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

            {otherNotes.map((note) => (
              <NoteCard note={note} key={note.id} handleViewNote={handleViewNote} handleEditNote={handleEditNote} deleteNote={deleteNote} pinNote={pinNote} buttonLoading={buttonLoading} open={open} handleNoteClick={handleNoteClick}></NoteCard>
            ))}
          </div>
        </>
      )}


      {/* Modal to view full note */}
      {viewModalOpen && noteToView && (
        <div className="fixed inset-0 flex items-center justify-center dark:bg-gray-600 bg-opacity-50 z-50 p-4">
          <div className="bg-white  dark:bg-gray-900 dark:text-white p-6 rounded-lg shadow-lg max-w-xl w-full max-h-[90vh] overflow-y-auto ">
            <p>
              <span className="font-semibold">Last Updated</span>{" "}
              {noteToView.date}
            </p>
            <p>
              <span className="font-semibold">Title:</span>
              <h2 className="text-1xl font-bold mb-1">{noteToView.title}</h2>
            </p>
            <p>
              <span className="font-semibold">Content:</span>{" "}
              {noteToView.content}
            </p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {noteToView.category}
            </p>
            <p>
              <span className="font-semibold">Last Updated</span>{" "}
              {noteToView.date}
            </p>
            <p>
              <span className="font-semibold">Tags:</span>{" "}
              {noteToView.tags.join(", ")}
            </p>
            <div className="mt-4 flex justify-end">
              <button
                className="btn btn-primary"
                onClick={() => setViewModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

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
    </div>
  );
};
