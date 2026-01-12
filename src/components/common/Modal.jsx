import { useState, forwardRef } from "react";
import { createPortal } from "react-dom";
import { NotesInput } from "../NotesInput";

const Modal = forwardRef(
  ({ fields, mode, onNoteAdded, onNoteUpdated }, ref) => {
    const [errors, setErrors] = useState({});
    return createPortal(
      <dialog
        ref={ref}
        id="my_modal_5"
        className="modal  modal-bottom sm:modal-middle"
      >
        <div className="modal-box w-11/12 max-w-2xl">
          <span className="flex justify-between">
            {" "}
            <h3 className="font-bold text-lg mb-4">
              {mode === "add" ? "Add New Note" : "Edit Note"}
            </h3>
          </span>
          {/* form */}
          <NotesInput
            fields={fields}
            errors={errors}
            dialogRef={ref}
            setErrors={setErrors}
            mode={mode}
            onNoteAdded={onNoteAdded}
            onNoteUpdated={onNoteUpdated}
          ></NotesInput>
        </div>
      </dialog>,
      document.getElementById("modal")
    );
  }
);

export default Modal;
