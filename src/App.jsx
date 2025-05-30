import React, { useState, useEffect } from "react";
import { Plus, StickyNote, Sun, Moon } from "lucide-react";
import NotesCard from "./components/NotesCard";
import { motion, AnimatePresence } from "framer-motion";

const colors = [
  "bg-purple-600",
  "bg-pink-600",
  "bg-green-600",
  "bg-yellow-600",
  "bg-blue-600",
];

const App = () => {
  const [notes, setNotes] = useState([
    { id: 1, title: "Subscribe", color: "bg-purple-600" },
    { id: 2, title: "Note App", color: "bg-pink-600" },
  ]);
  const [text, setText] = useState("");
  const [isToggle, setIsToggle] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [darkMode, setDarkMode] = useState(true);

  // Update note by id
  const updateNote = (id, newText) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, title: newText } : note
      )
    );
  };

  // Add new note
  const addNote = () => {
    if (text.trim().length === 0) {
      alert("Please Write Something");
      return;
    }
    setNotes((prev) => [
      ...prev,
      { id: new Date().getTime(), title: text.trim(), color: selectedColor },
    ]);
    setText("");
    setIsToggle(false);
    setSelectedColor(colors[0]);
  };

  // Delete note by id
  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  // Toggle dark/light theme
  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  // Sync dark mode class on body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen h-auto flex flex-col bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 overflow-x-hidden p-8 transition-colors duration-500`}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-5xl font-bold flex items-center gap-2 text-purple-400 drop-shadow-lg dark:text-purple-600">
          <StickyNote size={40} className="text-yellow-400" /> NOTE
        </h1>
        <p className="font-semibold text-gray-400 text-lg text-center dark:text-gray-600">
          Write your thought & Download it
        </p>
      </div>

      {/* Theme toggle button */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-8 p-2 rounded-full bg-gray-700 dark:bg-gray-300 text-yellow-400 dark:text-yellow-600 hover:scale-110 transition-transform"
        aria-label="Toggle Theme"
      >
        {darkMode ? <Sun size={24} /> : <Moon size={24} />}
      </button>

      {/* Add Note Button */}
      <motion.div
        className="flex flex-col items-center gap-2 mt-12 w-full max-w-xs mx-auto bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg p-8 shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
        onClick={() => setIsToggle(true)}
        layout
      >
        <Plus size={80} />
        <h1 className="text-2xl text-white font-bold">Add Note</h1>
      </motion.div>

      {/* Note Input Modal */}
      {isToggle && (
        <motion.div
          className="fixed top-1/2 left-1/2 z-50 border border-purple-500 md:h-1/2 md:w-2/5 w-11/12 bg-gray-900 rounded-lg flex flex-col items-center gap-4 p-8 shadow-lg dark:bg-gray-200"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="md:text-3xl text-xl font-semibold dark:text-gray-900">
            Write Your Notes..
          </h1>
          <textarea
            name="note"
            id="note"
            onChange={(e) => setText(e.target.value)}
            value={text}
            className="text-black bg-gray-200 dark:bg-white rounded-lg w-full h-32 p-2 resize-none focus:outline-none"
            placeholder="Start typing..."
          ></textarea>

          {/* Color selection */}
          <div className="flex gap-3 justify-center">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`${color} w-8 h-8 rounded-full border-2 ${
                  selectedColor === color ? "border-white" : "border-transparent"
                } transition-all`}
                aria-label={`Select color ${color}`}
              ></button>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              className="bg-purple-600 px-6 py-2 rounded-lg mt-4 hover:bg-purple-700 transition-colors"
              onClick={addNote}
            >
              Add
            </button>
            <button
              className="bg-gray-600 px-6 py-2 rounded-lg mt-4 hover:bg-gray-700 transition-colors"
              onClick={() => setIsToggle(false)}
            >
              Cancel
            </button>
          </div>
        </motion.div>
      )}

      {/* Notes Display */}
      <div className="flex flex-wrap justify-center items-center gap-6 mt-10">
        <AnimatePresence>
          {notes.length > 0 ? (
            notes.map((note) => (
              <NotesCard
                key={note.id}
                id={note.id}
                note={note.title}
                color={note.color}
                deleteNote={deleteNote}
                updateNote={updateNote}
              />
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-400 dark:text-gray-600"
            >
              No Notes Yet
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default App;

