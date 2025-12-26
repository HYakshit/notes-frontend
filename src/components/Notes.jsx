import { AddNote } from "./common/AddNote";
import { NotesGrid } from "./common/NotesGrid";
import { useNotes } from "../hooks/NotesContext";

const Notes = () => {
  const { notes, loading, setNotes } = useNotes();

  if (loading) {
    return (
      <div className="flex text-black dark:bg-gray-900 dark:text-white  justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      {!notes || notes.length === 0 ? (
        <>

          <div className="flex text-black justify-center dark:bg-gray-600 dark:text-white items-center h-screen">
            No notes available. {<AddNote justifyDirection="center" />}
          </div>
        </>
      ) : (
        <>

          <NotesGrid notes={notes} setNotes={setNotes}></NotesGrid>
        </>
      )}
    </>
  );
};

export default Notes;
