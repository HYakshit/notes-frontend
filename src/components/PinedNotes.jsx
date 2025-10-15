import axios from "axios";
import React, { useState } from "react";
import * as notesApi from "../services/api";

export const PinedNotes = ({ notes, loading, setNotes }) => {
  const [open, setOpenNotes] = useState([]); // track opened collapses

  // Modal state
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [noteToView, setNoteToView] = useState(null);

  function handleNoteClick(id) {
    setOpenNotes(prev =>
      prev.includes(id)
        ? prev.filter(noteId => noteId !== id)
        : [...prev, id]
    );
  }

  function pinNote(id) {
    axios
      .put(`/api/notes/${id}/pin`)
      .then(() => {
        notesApi.fetchNotes().then((data) => setNotes(data));
      })
      .catch((err) => console.error(err));
  }

  // NEW: Open modal for full note
  const handleViewNote = (note) => {
    setNoteToView(note);
    setViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setNoteToView(null);
    setViewModalOpen(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!notes || notes.filter(note => note.pinned).length === 0) {
    return <div className="flex justify-center items-center h-screen">No pinned notes available</div>;
  }

  return (
    <>
      <div className='bg-gray-100 grid items-start gap-4 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {notes
          .filter(note => note.pinned)
          .map((note) => (
            <div key={note.id} className="bg-white p-4 rounded-lg shadow-md w-full">
              {/* Buttons */}
              <div className="flex justify-end gap-2 mb-1">
                <button className="btn btn-xs bg-yellow-300">Edit</button>
                <button className="btn btn-xs bg-red-400">Delete</button>
                <button onClick={() => pinNote(note.id)} className="btn btn-xs bg-blue-400">
                  {note.pinned ? "Unpin" : "Pin"}
                </button>
              </div>

              {/* Collapse card */}
              <div
                className={`collapse collapse-arrow bg-base-100 border border-base-300 cursor-pointer ${open.includes(note.id) ? "collapse-open" : ""}`}
                onClick={() => handleNoteClick(note.id)}
              >
                <span className="collapse-title font-semibold">{note.title}</span>

                <div className="collapse-content text-sm" onClick={(e) => { e.stopPropagation(); handleViewNote(note); }}>
                  <p className="truncate-2-lines h-10">
                    <span className="font-semibold text-overline">Details: </span> {note.content}
                  </p>
                  <p><span className="font-semibold">Category: </span>{note.category}</p>
                  <p><span className="font-semibold">Date: </span>{note.date}</p>
                  <p><span className="font-semibold">Tags: </span>{note.tags.join(", ")}</p>
                  <p className="text-xs text-gray-400 mt-2">(Click here to view full note)</p>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Modal to view full note */}
      {viewModalOpen && noteToView && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full max-h-[90vh] overflow-y-auto text-black">
            <h2 className="text-2xl font-bold mb-4">{noteToView.title}</h2>
            <p className="mb-2 whitespace-pre-wrap">{noteToView.content}</p>
            <p><span className="font-semibold">Category:</span> {noteToView.category}</p>
            <p><span className="font-semibold">Date:</span> {noteToView.date}</p>
            <p><span className="font-semibold">Tags:</span> {noteToView.tags.join(", ")}</p>
            <div className="mt-4 flex justify-end">
              <button className="btn btn-primary" onClick={handleCloseViewModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
