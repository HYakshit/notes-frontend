// src/hooks/useNotes.js
import { useState, useEffect } from "react";
import * as notesApi from "../services/api";

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotes = async () => {
    try {
      const data = await notesApi.fetchNotes();
      setNotes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  return { notes, setNotes, loading, loadNotes };
};
