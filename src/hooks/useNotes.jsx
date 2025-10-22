import { useState, useEffect } from "react";
import * as notesApi from "../services/api";

export const useNotes = (enabled = true) => {
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
    if (!enabled) {
      setLoading(false);
      return;
    }
    loadNotes();
    // re-run if enabled toggles true later
  }, [enabled]);

  return { notes, setNotes, loading, loadNotes };
};