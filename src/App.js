import React, { useState } from "react";
import { FiEdit, FiTrash, FiPlus } from "react-icons/fi";
import "./App.css";

const NoteForm = ({ addNote, editNote, currentNote, setCurrentNote }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [showForm, setShowForm] = useState(false);

  React.useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setText(currentNote.text);
      setShowForm(true);
    }
  }, [currentNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentNote) {
      editNote(currentNote.id, title, text);
    } else {
      addNote(title, text);
    }
    setTitle("");
    setText("");
    setCurrentNote(null);
    setShowForm(false);
  };

  return (
    <div className="form-container">
      <button onClick={() => setShowForm(!showForm)} className="add-btn">
        <FiPlus size={24} />
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="note-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            required
          />
          <textarea
            placeholder="Description"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="textarea"
            required
          ></textarea>
          <button type="submit" className="save-btn">
            {currentNote ? "Edit Note" : "Save Note"}
          </button>
        </form>
      )}
    </div>
  );
};

const NoteItem = ({ note, deleteNote, selectNote }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="note-card">
      <div className="note-header">
        <h3 className="note-title" onClick={() => setExpanded(!expanded)}>
          {note.title}
        </h3>
        <div className="icons">
          <button onClick={() => selectNote(note)} className="edit-icon">
            <FiEdit size={18} />
          </button>
          <button onClick={() => deleteNote(note.id)} className="delete-icon">
            <FiTrash size={18} />
          </button>
        </div>
      </div>
      {expanded ? (
        <p className="note-text">{note.text}</p>
      ) : (
        <p className="note-preview">{note.text.substring(0, 30)}...</p>
      )}
    </div>
  );
};

const NoteList = ({ notes, deleteNote, selectNote }) => (
  <div className="notes-container">
    {notes.length > 0 ? (
      notes.map((note) => (
        <NoteItem key={note.id} note={note} deleteNote={deleteNote} selectNote={selectNote} />
      ))
    ) : (
      <p className="no-notes">No notes available.</p>
    )}
  </div>
);

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);

  const addNote = (title, text) => {
    const newNote = { id: Date.now(), title, text };
    setNotes([...notes, newNote]);
  };

  const editNote = (id, newTitle, newText) => {
    setNotes(notes.map((note) => (note.id === id ? { ...note, title: newTitle, text: newText } : note)));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  return (
    <div className="app-container">
      <NoteForm addNote={addNote} editNote={editNote} currentNote={currentNote} setCurrentNote={setCurrentNote} />
      <NoteList notes={notes} deleteNote={deleteNote} selectNote={setCurrentNote} />
    </div>
  );
};

export default App;
