import { useState, useEffect } from "react";
import * as notesApi from "../services/api";

const Modal = ({ fields, ref, mode, onNoteAdded, onNoteUpdated }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [errors, setErrors] = useState({});

  // Update form data when fields change (for edit mode)
  useEffect(() => {
    if (fields && mode === "edit") {
      setFormData({
        title: fields.title || "",
        content: fields.content || "",
        category: fields.category || "",
        tags: fields.tags ? fields.tags.join(", ") : "",
        date: fields.date || new Date().toISOString().split("T")[0],
      });
    } else if (mode === "add") {
      setFormData({
        title: "",
        content: "",
        category: "",
        tags: "",
        date: new Date().toISOString().split("T")[0],
      });
    }
  }, [fields, mode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }
    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const noteData = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
      };

      if (mode === "add") {
        await notesApi.createNote(noteData);
        onNoteAdded && onNoteAdded();
      } else if (mode === "edit") {
        await notesApi.updateNote(fields.id, noteData);
        onNoteUpdated && onNoteUpdated();
      }

      // Close modal
      ref.current.close();

      // Reset form
      setFormData({
        title: "",
        content: "",
        category: "",
        tags: "",
        date: new Date().toISOString().split("T")[0],
      });
      setErrors({});
    } catch (error) {
      console.error("Error saving note:", error);
      setErrors({ submit: "Failed to save note. Please try again." });
    }
  };

  const handleClose = () => {
    ref.current.close();
    setErrors({});
  };

  return (
    <dialog
      ref={ref}
      id="my_modal_5"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box w-11/12 max-w-2xl">
        <h3 className="font-bold text-lg mb-4">
          {mode === "add" ? "Add New Note" : "Edit Note"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title *</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={`input input-bordered ${
                errors.title ? "input-error" : ""
              }`}
              placeholder="Enter note title"
            />
            {errors.title && (
              <span className="text-error text-sm">{errors.title}</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Content *</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              className={`textarea textarea-bordered ${
                errors.content ? "textarea-error" : ""
              }`}
              placeholder="Enter note content"
              rows="4"
            />
            {errors.content && (
              <span className="text-error text-sm">{errors.content}</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Category *</span>
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`input input-bordered ${
                errors.category ? "input-error" : ""
              }`}
              placeholder="Enter category"
            />
            {errors.category && (
              <span className="text-error text-sm">{errors.category}</span>
            )}
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Tags</span>
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="input input-bordered"
              placeholder="Enter tags separated by commas"
            />
            <label className="label">
              <span className="label-text-alt">
                Separate multiple tags with commas
              </span>
            </label>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="input input-bordered"
            />
          </div>

          {errors.submit && (
            <div className="alert alert-error">
              <span>{errors.submit}</span>
            </div>
          )}

          <div className="modal-action">
            <button
              type="button"
              onClick={handleClose}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {mode === "add" ? "Add Note" : "Update Note"}
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default Modal;
