import { useState } from "react";
import { NotesInput } from "../NotesInput";


const Modal = ({ fields, ref, mode, onNoteAdded, onNoteUpdated }) => {
    const [errors, setErrors] = useState({});
    const handleClose = () => {
    ref.current.close();
    setErrors({});
  };
  return (
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
          ref={ref}
          setErrors={setErrors}
          mode={mode}
          onNoteAdded={onNoteAdded}
          onNoteUpdated={onNoteUpdated}
        ></NotesInput>
      </div>
    </dialog>
  );
};

export default Modal;
