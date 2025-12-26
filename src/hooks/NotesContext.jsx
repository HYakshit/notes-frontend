import { createContext, useState, useEffect, useContext } from "react";
import * as notesApi from "../services/api";
import { useAuth } from "./AuthContext";

const NotesContext = createContext();

export function NotesProvider({ children }) {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const loadNotes = async () => {
        // Only fetch if we have a user
        if (!user) {
            setNotes([]);
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const data = await notesApi.fetchNotes();
            setNotes(data || []);
        } catch (err) {
            console.error(err);
            // If error (e.g. 401), we might want to clear notes, but let's just log for now
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // When user changes:
        // If no user, clear notes immediately.
        // If user exists, we COULD fetch automatically, or wait for components to request it.
        // Given the original App.jsx logic, it seems desirable to have notes ready.
        // But to be efficient, let's just clear if no user.
        if (!user) {
            setNotes([]);
            setLoading(false); // Not loading anything
        } else {
            // User logged in, let's fetch!
            loadNotes();
        }
    }, [user?.email]);

    return (
        <NotesContext.Provider value={{ notes, setNotes, loading, loadNotes }}>
            {children}
        </NotesContext.Provider>
    );
}

export const useNotes = () => {
    return useContext(NotesContext);
};
