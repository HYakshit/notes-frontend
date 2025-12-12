import { AddNote } from "./common/AddNote";
import { NotesGrid } from "./common/NotesGrid";

const Notes = ({ notes, loading, setNotes }) => {

  if (loading) {
    return (
      <div className="flex dark:bg-gray-900 dark:text-white  justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      {!notes || notes.length === 0 ? (
        <>
         
          <div className="flex justify-center dark:bg-gray-600 dark:text-white items-center h-screen">
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
