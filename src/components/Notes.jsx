import React, { useState, useRef } from "react";
import * as notesApi from "../services/api";
import { NoteBar } from "./NoteBar";
import Modal from "./Modal"; // your existing Add/Edit modal

const Notes = ({ notes, loading, setNotes }) => {
  const [open, setOpenNotes] = useState([]);
  const [modalMode, setModalMode] = useState("add");
  const [selectedNote, setSelectedNote] = useState(null);
  const modalRef = useRef();

  // NEW: Modal for viewing full note
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [noteToView, setNoteToView] = useState(null);

  const handleViewNote = (note) => {
    setNoteToView(note);
    setViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setNoteToView(null);
    setViewModalOpen(false);
  };

  // Existing collapse toggle
  const handleNoteClick = (id) => {
    setOpenNotes((prev) =>
      prev.includes(id) ? prev.filter((noteId) => noteId !== id) : [...prev, id]
    );
  };

  // Existing add/edit/delete/pin logic stays the same
  const deleteNote = (id) => {
    notesApi
      .deleteNote(id)
      .then(() => notesApi.fetchNotes().then((data) => setNotes(data)));
  };

  const handleAddNote = () => {
    setModalMode("add");
    setSelectedNote(null);
    modalRef.current.showModal();
  };

  const handleEditNote = (note) => {
    setModalMode("edit");
    setSelectedNote(note);
    modalRef.current.showModal();
  };

  const pinNote = (id) => {
    notesApi
      .updateNote(id, { pinned: true })
      .then(() => notesApi.fetchNotes().then((data) => setNotes(data)));
  };

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

      {/* Add/Edit Modal (unchanged) */}
      <Modal
        fields={selectedNote}
        ref={modalRef}
        mode={modalMode}
        onNoteAdded={() => notesApi.fetchNotes().then((data) => setNotes(data))}
        onNoteUpdated={() =>
          notesApi.fetchNotes().then((data) => setNotes(data))
        }
      />

      {/* NEW: Modal to view full note */}
      {viewModalOpen && noteToView && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full max-h-[90vh] overflow-y-auto text-black">
            <h2 className="text-2xl font-bold mb-4">{noteToView.title}</h2>
            <p className="mb-2 whitespace-pre-wrap">{noteToView.content}</p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {noteToView.category}
            </p>
            <p>
              <span className="font-semibold">Date:</span> {noteToView.date}
            </p>
            <p>
              <span className="font-semibold">Tags:</span>{" "}
              {noteToView.tags.join(", ")}
            </p>
            <div className="mt-4 flex justify-end">
              <button
                className="btn btn-primary"
                onClick={handleCloseViewModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Notes;
