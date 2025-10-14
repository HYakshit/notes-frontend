import axios from "axios";
import { useRef, useState } from "react";
import * as notesApi from "../services/api";

import { NoteBar } from "./NoteBar";
import Modal from "./Modal";

const notes = ({ notes, loading, setNotes }) => {
  const [open, setOpenNotes] = useState([]); // null = none open, id = open note
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
    setOpenNotes(
      (prev) =>
        prev.includes(id)
          ? prev.filter((noteId) => noteId !== id) // close if already open
          : [...prev, id] // otherwise add to open
    );
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
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      {!notes || notes.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <NoteBar handleClick={handleAddNote}></NoteBar>
        </div>
      ) : (
        <>
          <NoteBar handleClick={handleAddNote}></NoteBar>
          <div
            className="grid items-start gap-4 p-4 
                grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {notes?.map((note) => (
              <div
                key={note.id}
                className=" bg-white p-4 rounded-lg shadow-md w-full"
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
                    {note.pinned ? "Unpin" : "Pin"}
                  </button>
                </div>
                {/* Collapse card */}
                <div
                  className={`collapse collapse-arrow bg-base-100 border border-base-300 ${
                    open.includes(note.id) ? "collapse-open" : ""
                  }`}
                  onClick={() => handleNoteClick(note.id)}
                >
                  <span className="collapse-title font-semibold">
                    {note.title}
                  </span>

                  <div className="collapse-content text-sm">
                    <p className="truncate-2-lines h-10">
                      <span className="font-semibold text-overline ">
                        Details:{" "}
                      </span>{" "}
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
        </>
      )}

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

export default notes;
