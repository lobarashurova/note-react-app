import React, { useState } from "react";

const Header = () => (
  <header className="p-4 bg-blue-500 text-white text-center text-xl font-bold">
    Notes App
  </header>
);

const NoteForm = ({ addNote, editNote, currentNote, setCurrentNote }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useState(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setText(currentNote.text);
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
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded mb-2"
        required
      />
      <textarea
        placeholder="Text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="block w-full p-2 border border-gray-300 rounded mb-2"
        required
      ></textarea>
      <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
        {currentNote ? "Edit Note" : "Add Note"}
      </button>
    </form>
  );
};

const NoteItem = ({ note, deleteNote, selectNote }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-4 border border-gray-300 rounded mb-2 cursor-pointer">
      <h3 className="font-bold" onClick={() => setExpanded(!expanded)}>
        {note.title}
      </h3>
      {expanded ? (
        <p>{note.text}</p>
      ) : (
        <p className="text-gray-500">{note.text.substring(0, 30)}...</p>
      )}
      <div className="flex gap-2 mt-2">
        <button onClick={() => selectNote(note)} className="text-blue-500">Edit</button>
        <button onClick={() => deleteNote(note.id)} className="text-red-500">Delete</button>
      </div>
    </div>
  );
};

const NoteList = ({ notes, deleteNote, selectNote }) => (
  <div className="p-4">
    {notes.length > 0 ? (
      notes.map((note) => (
        <NoteItem key={note.id} note={note} deleteNote={deleteNote} selectNote={selectNote} />
      ))
    ) : (
      <p className="text-center text-gray-500">No notes available.</p>
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

  const selectNote = (note) => {
    setCurrentNote(note);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg overflow-hidden">
      <Header />
      <NoteForm addNote={addNote} editNote={editNote} currentNote={currentNote} setCurrentNote={setCurrentNote} />
      <NoteList notes={notes} deleteNote={deleteNote} selectNote={selectNote} />
    </div>
  );
};

export default App;
