// Material UI Icons
import EditIcon from "@mui/icons-material/Edit";
import PushPinIcon from "@mui/icons-material/PushPin";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";

export const NoteCard = ({ note, handleViewNote, handleEditNote, deleteNote, pinNote, buttonLoading, open, handleNoteClick }) => {
    return (
        <div
            key={note.id}
            className="bg-white p-2 rounded-lg shadow-md w-full"
        >
            {/* Buttons */}
            <div className="flex justify-end gap-2 mb-1">
                {/* View Full Button */}
                <button
                    onClick={() => handleViewNote(note)}
                    className="btn btn-xs text-black navbar-bg flex items-center justify-center"
                >
                    {buttonLoading.view === note.id ? (
                        <CircularProgress size={16} color="inherit" />
                    ) : (
                        <VisibilityIcon size={16} color="inherit" />
                    )}
                </button>

                {/* Edit Button */}
                <button
                    onClick={() => handleEditNote(note)}
                    className="btn btn-xs text-black navbar-bg flex items-center justify-center"
                >
                    {buttonLoading.edit === note.id ? (
                        <CircularProgress size={16} color="inherit" />
                    ) : (
                        <EditIcon fontSize="small" />
                    )}
                </button>

                {/* Pin Button */}
                <button
                    onClick={() => pinNote(note.id)}
                    className="btn btn-xs flex items-center justify-center"
                    style={{
                        backgroundColor: note.pinned ? "#feefc3" : "white",
                        color: "black",
                    }}
                >
                    {buttonLoading.pin === note.id ? (
                        <CircularProgress size={16} color="inherit" />
                    ) : (
                        <PushPinIcon fontSize="small" />
                    )}
                </button>

                {/* Delete Button */}
                <button
                    onClick={() => deleteNote(note.id)}
                    className="btn btn-xs flex items-center justify-center"
                    style={{ backgroundColor: "#f28a73ff", color: "white" }}
                >
                    {buttonLoading.delete === note.id ? (
                        <CircularProgress size={16} color="inherit" />
                    ) : (
                        <DeleteIcon fontSize="small" />
                    )}
                </button>
            </div>

            {/* Collapse card */}
            <div
                className={`collapse collapse-arrow bg-base-100 border border-base-300 ${open.includes(note.id) ? "collapse-open" : ""
                    }`}
                onClick={() => handleNoteClick(note.id)}
            >
                <span className="collapse-title font-semibold ">
                    {note.title}
                </span>

                <div className="collapse-content text-sm">

                    <p className="truncate-2-lines">
                        <span className="font-semibold">Category: </span>
                        {note.category}
                    </p>

                    <p className="truncate-2-lines">
                        <span className="font-semibold">Tags: </span>
                        {note.tags.join(", ")}
                    </p>
                    <p className="truncate-2-lines h-10">
                        <span className="font-semibold text-overline">Details: </span>
                        {note.content}
                    </p>
                    <p className="text-end text-xs">
                        <span className="">Edited:</span>
                        {note.date}
                    </p>
                </div>
            </div>
        </div>
    )
}
