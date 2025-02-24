import React, { useState } from "react";
import "./App.css";
import { FaPlus, FaTrash, FaEdit, FaTimes } from "react-icons/fa";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  const addNote = () => {
    if (!title.trim() || !description.trim()) return;

    if (editingId !== null) {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === editingId ? { ...note, title, description } : note
        )
      );
      setEditingId(null);
    } else {
      const newNote = {
        id: Date.now(),
        title,
        description,
      };
      setNotes([newNote, ...notes]);
    }

    setTitle("");
    setDescription("");
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const editNote = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setDescription(noteToEdit.description);
      setEditingId(id);
    }
  };

  const openPopup = (note) => {
    setSelectedNote(note);
  };

  const closePopup = () => {
    setSelectedNote(null);
  };

  return (
    <div className="container">
      <header>
        <h2>My Notes</h2>
        <button className="add-btn" onClick={addNote}>
          <FaPlus /> Add Note
        </button>
      </header>

      <div className="input-container">
        <input
          type="text"
          placeholder="Title (max 50 characters)"
          maxLength="50"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
        />
        <button className="submit-btn" onClick={addNote}>
          {editingId ? "Update Note" : "Add Note"}
        </button>
      </div>

      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-card" onClick={() => openPopup(note)}>
            <h3 className="note-title">{note.title}</h3>
            <p className="note-description">{note.description}</p>
            <div className="note-actions">
              <FaEdit className="edit-icon" onClick={(e) => { e.stopPropagation(); editNote(note.id); }} />
              <FaTrash className="delete-icon" onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }} />
            </div>
          </div>
        ))}
      </div>

      {selectedNote && (
        <div className="popup">
          <div className="popup-content">
            <button className="close-btn" onClick={closePopup}>
              <FaTimes />
            </button>
            <h3>{selectedNote.title}</h3>
            <p>{selectedNote.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
