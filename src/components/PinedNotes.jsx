import axios from "axios";
import React, { useState } from "react";
import * as notesApi from "../services/api";

// Material UI Icons
import EditIcon from "@mui/icons-material/Edit";
import PushPinIcon from "@mui/icons-material/PushPin";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import { NoteCard } from "./common/NoteCard";

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
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const pinnedNotes = notes?.filter((note) => note.pinned);
  if (!pinnedNotes || pinnedNotes.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        No pinned notes available
      </div>
    );
  }

  return (
    <>
      <NoteCard notes={pinnedNotes} setNotes={setNotes}></NoteCard>
    </>
  );
};
