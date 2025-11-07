import { AddNote } from "./common/AddNote";
import { NoteCard } from "./common/NoteCard";

export const PinedNotes = ({ notes, loading, setNotes }) => {

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
      <div className="flex justify-center  dark:bg-gray-600 dark:text-white items-center h-screen">
        No pinned notes available. {<AddNote justifyDirection="center" setNotes={setNotes} />}
      </div>
    );
  }

  return (
    <>
      <NoteCard notes={pinnedNotes} setNotes={setNotes}></NoteCard>
    </>
  );
};
