import React from "react";
import { useState, useEffect } from "react";
import * as notesApi from "../services/api";

export const NotesInput = ({ fields, ref, errors, setErrors, mode, onNoteAdded, onNoteUpdated }) => {
  const handleClose = () => {
    ref.current.close();
    setErrors({});
  };
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
    date: new Date().toISOString().split("T")[0],
  });



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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Title *</span>
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className={`input input-bordered w-full ${
            errors.title ? "input-error" : ""
          }`}
          placeholder="Enter note title"
        />
        {errors.title && (
          <span className="text-error text-sm mt-1">{errors.title}</span>
        )}
      </div>

      {/* Content */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Content *</span>
        </label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          className={`textarea textarea-bordered w-full ${
            errors.content ? "textarea-error" : ""
          }`}
          placeholder="Enter note content"
          rows="5"
        />
        {errors.content && (
          <span className="text-error text-sm mt-1">{errors.content}</span>
        )}
      </div>

      {/* Category */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Category *</span>
        </label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className={`input input-bordered w-full ${
            errors.category ? "input-error" : ""
          }`}
          placeholder="Enter category"
        />
        {errors.category && (
          <span className="text-error text-sm mt-1">{errors.category}</span>
        )}
      </div>

      {/* Tags */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Tags</span>
        </label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleInputChange}
          className="input input-bordered w-full"
          placeholder="Enter tags separated by commas"
        />
        <label className="label">
          <span className="label-text-alt text-gray-500">
            Separate multiple tags with commas
          </span>
        </label>
      </div>

      {/* Date */}
      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold">Date</span>
        </label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          className="input input-bordered w-full"
        />
      </div>

      {/* Error Alert */}
      {errors.submit && (
        <div className="alert alert-error shadow-sm">
          <span>{errors.submit}</span>
        </div>
      )}

      {/* Actions */}
      <div className="modal-action flex justify-end gap-3">
        <button
          type="button"
          onClick={handleClose}
          className="btn btn-outline btn-error"
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          {mode === "add" ? "Add Note" : "Update Note"}
        </button>
      </div>
    </form>
  );
};
