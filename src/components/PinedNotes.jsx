import { AddNote } from "./common/AddNote";
import { NotesGrid } from "./common/NotesGrid";
import { useNotes } from "../hooks/NotesContext";

export const PinedNotes = () => {
  const { notes, loading, setNotes } = useNotes();

  if (loading) {
    return (
      <div className="flex justify-center  dark:bg-gray-600 dark:text-white items-center h-screen">
        Loading...
      </div>
    );
  }

  const pinnedNotes = notes?.filter((note) => note.pinned);
  if (!pinnedNotes || pinnedNotes.length === 0) {
    return (
      <div className="flex justify-center  dark:bg-gray-600 dark:text-white items-center h-screen">
        No pinned notes available. {<AddNote justifyDirection="center" setNotes={setNotes} />}
      </div>
    );
  }

  return (
    <>
      <NotesGrid notes={pinnedNotes} setNotes={setNotes} isPinned={true}></NotesGrid>
    </>
  );
};
