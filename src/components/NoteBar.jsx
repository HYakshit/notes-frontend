export const NoteBar = ({ handleClick }) => {
  return (
    <div className="flex justify-end bg-gray-100 p-4">
      <button className="btn btn-primary" onClick={handleClick}>
        Add Note
      </button>
    </div>
  );
};
