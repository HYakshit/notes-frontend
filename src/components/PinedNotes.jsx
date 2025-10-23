import axios from "axios";
import React, { useState } from "react";
import * as notesApi from "../services/api";

// Material UI Icons
import EditIcon from "@mui/icons-material/Edit";
import PushPinIcon from "@mui/icons-material/PushPin";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";

export const PinedNotes = ({ notes, loading, setNotes }) => {
  const [open, setOpenNotes] = useState([]);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [noteToView, setNoteToView] = useState(null);
  const [buttonLoading, setButtonLoading] = useState({
    view: null,
    edit: null,
    delete: null,
    pin: null,
  });

  function handleNoteClick(id) {
    setOpenNotes((prev) =>
      prev.includes(id) ? prev.filter((noteId) => noteId !== id) : [...prev, id]
    );
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

  const handleCloseViewModal = () => {
    setNoteToView(null);
    setViewModalOpen(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const pinnedNotes = notes?.filter((note) => note.pinned);
  if (!pinnedNotes || pinnedNotes.length === 0) {
    return <div className="flex justify-center items-center h-screen">No pinned notes available</div>;
  }

  return (
    <>
      <div className="bg-gray-100 grid items-start gap-4 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {pinnedNotes.map((note) => (
          <div key={note.id} className="bg-white p-4 rounded-lg shadow-md w-full">
            {/* Buttons */}
            <div className="flex justify-end gap-2 mb-1">
              {/* View Full Button */}
              <button
                onClick={() => handleViewNote(note)}
                className="btn btn-xs text-white flex items-center justify-center"
                style={{ backgroundColor: "#5754E8" }}
              >
                {buttonLoading.view === note.id ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  "View full"
                )}
              </button>

              {/* Edit Button */}
              <button
                className="btn btn-xs flex items-center justify-center"
                style={{ backgroundColor: "#22c55e", color: "white" }}
              >
                {buttonLoading.edit === note.id ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <EditIcon fontSize="small" />
                )}
              </button>

              {/* Delete Button */}
              <button
                className="btn btn-xs flex items-center justify-center"
                style={{ backgroundColor: "#ef4444", color: "white" }}
              >
                {buttonLoading.delete === note.id ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <DeleteIcon fontSize="small" />
                )}
              </button>

              {/* Pin Button */}
              <button
                onClick={() => pinNote(note.id)}
                className="btn btn-xs flex items-center justify-center"
                style={{
                  backgroundColor: note.pinned ? "black" : "#3b82f6",
                  color: "white",
                }}
              >
                {buttonLoading.pin === note.id ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  <PushPinIcon fontSize="small" />
                )}
              </button>
            </div>

            {/* Collapse card */}
            <div
              className={`collapse collapse-arrow bg-base-100 border border-base-300 ${
                open.includes(note.id) ? "collapse-open" : ""
              }`}
              onClick={() => handleNoteClick(note.id)}
            >
              <span className="collapse-title font-semibold">{note.title}</span>
              <div className="collapse-content text-sm">
                <p className="truncate-2-lines h-10">
                  <span className="font-semibold text-overline">Details: </span>
                  {note.content}
                </p>
                <p>
                  <span className="font-semibold">Category: </span>
                  {note.category}
                </p>
                <p>
                  <span className="font-semibold">Date: </span>
                  {note.date}
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

      {/* Modal to view full note */}
      {viewModalOpen && noteToView && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full max-h-[90vh] overflow-y-auto text-black">
            <h2 className="text-2xl font-bold mb-4">{noteToView.title}</h2>
            <p className="mb-2 whitespace-pre-wrap">{noteToView.content}</p>
            <p>
              <span className="font-semibold">Category:</span> {noteToView.category}
            </p>
            <p>
              <span className="font-semibold">Date:</span> {noteToView.date}
            </p>
            <p>
              <span className="font-semibold">Tags:</span> {noteToView.tags.join(", ")}
            </p>
            <div className="mt-4 flex justify-end">
              <button className="btn btn-primary" onClick={() => setViewModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
