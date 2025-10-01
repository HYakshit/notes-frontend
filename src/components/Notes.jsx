import axios from "axios";
import { useRef, useState } from "react";
import * as notesApi from "../services/api";
import Modal from "./Modal";
import { NoteBar } from "./noteBar";

const Notes = ({ notes, loading, setNotes }) => {
  const [open, setOpen] = useState(null); // null = none open, id = open note
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'edit'
  const [selectedNote, setSelectedNote] = useState(null);
  const modalref = useRef();

  function deleteNote(id) {
    notesApi
      .deleteNote(id)
      .then(() => {
        notesApi.fetchNotes().then((data) => {
          setNotes(data);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleAddNote() {
    setModalMode("add");
    setSelectedNote(null);
    modalref.current.showModal();
  }

  function handleEditNote(note) {
    setModalMode("edit");
    setSelectedNote(note);
    modalref.current.showModal();
  }

  function handleNoteClick(id) {
    setOpen((prevId) => (prevId === id ? null : id));
  }

  function handleNoteAdded() {
    // Refresh notes list after adding
    notesApi.fetchNotes().then((data) => {
      setNotes(data);
    });
  }

  function handleNoteUpdated() {
    // Refresh notes list after updating
    notesApi.fetchNotes().then((data) => {
      setNotes(data);
    });
  }

  function pinNote(id) {
    axios
      .put(`/api/notes/${id}/pin`)
      .then(() => {
        notesApi.fetchNotes().then((data) => {
          setNotes(data);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (notes.length === 0) {
    return <div>No notes available</div>;
  }

  return (
    <>
      <NoteBar handleClick={handleAddNote}></NoteBar>
      <div className="flex justify-center items-center bg-gray-100 flex-col gap-4 p-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className=" max-w-60 bg-white p-4 rounded-lg shadow-md w-full"
          >
            {/* Buttons */}
            <div className="flex justify-end gap-2 mb-1">
              <button
                onClick={() => handleEditNote(note)}
                className="btn btn-xs bg-yellow-300"
              >
                Edit
              </button>
              <button
                onClick={() => deleteNote(note.id)}
                className="btn btn-xs bg-red-400"
              >
                Delete
              </button>

              <button
                onClick={() => pinNote(note.id)}
                className="btn btn-xs bg-blue-400"
              >
                Pin
              </button>
            </div>
            {/* Collapse card */}
            <div
              className={`collapse collapse-arrow bg-base-100 border border-base-300 ${
                open === note.id ? "collapse-open" : ""
              }`}
              onClick={() => handleNoteClick(note.id)}
            >
              <span className="collapse-title font-semibold">{note.title}</span>

              <div className="collapse-content text-sm">
                <p>
                  <span className="font-semibold">Details: </span>{" "}
                  {note.content}
                </p>
                <p>
                  <span className="font-semibold">Category: </span>{" "}
                  {note.category}
                </p>
                <p>
                  <span className="font-semibold">Date: </span> {note.date}
                </p>
                <p>
                  <span className="font-semibold">Tags: </span>
                  {note.tags.join(", ")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Single Modal for both add and edit */}
      <Modal
        fields={selectedNote}
        ref={modalref}
        mode={modalMode}
        onNoteAdded={handleNoteAdded}
        onNoteUpdated={handleNoteUpdated}
      />
    </>
  );
};

export default Notes;
