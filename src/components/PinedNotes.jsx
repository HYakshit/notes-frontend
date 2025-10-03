import axios from "axios";
import React, { useState } from "react";
import * as notesApi from "../services/api";
export const PinedNotes = ({ notes, loading,setNotes }) => {
  function handleNoteClick(id) {
    setOpenNotes(
      (prev) =>
        prev.includes(id)
          ? prev.filter((noteId) => noteId !== id) // close if already open
          : [...prev, id] // otherwise add to open
    );
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
  const [open, setOpenNotes] = useState([]); // null = none open, id = open note
  if (loading) {
    return <div>Loading...</div>;
  }

  if (notes.length === 0) {
    return <div>No notes available</div>;
  }
  return (
    <div
      className='bg-gray-100 grid items-start gap-4 p-4 
                grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"'
    >
      {notes
        .filter((note) => note.pinned)
        .map((note) => (
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
            <div
              className={`collapse collapse-arrow bg-base-100 border border-base-300 ${
                open.includes(note.id) ? "collapse-open" : ""
              }`}
              onClick={() => handleNoteClick(note.id)}
            >
              <span className="collapse-title font-semibold">{note.title}</span>

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
  );
};
