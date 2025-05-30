import React, { useState } from "react";
import { Trash, Save, Edit2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NotesCard = ({ note, id, deleteNote, updateNote, color = "bg-purple-600" }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(note);

  const handleDownload = (e) => {
    e.preventDefault();

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");

    const dateTime = `${year}-${month}-${day}_${hour}-${minute}`;
    const prefix = editText.length > 5 ? editText.slice(0, 5) : editText;
    const fileName = `Note_${dateTime}_${prefix}.txt`;

    const blob = new Blob([editText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveEdit = () => {
    if (editText.trim().length === 0) return; // avoid empty
    updateNote(id, editText.trim());
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setEditText(note);
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col justify-between items-center w-64 h-64 rounded-lg shadow-lg p-4 m-4 ${color} text-white`}
    >
      <div className="flex justify-center w-full items-center rounded-lg p-2 bg-purple bg-opacity-25">
        <p className="text-sm text-white truncate">{id}</p>
      </div>

      <div className="flex-grow w-full flex flex-col justify-center">
        <AnimatePresence>
          {!isEditing ? (
            <motion.h1
              key="view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-lg font-bold text-center px-2 overflow-hidden break-words cursor-pointer"
              onClick={() => setIsEditing(true)}
              title="Click to edit"
            >
              {note}
            </motion.h1>
          ) : (
            <motion.textarea
              key="edit"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="resize-none p-2 rounded-lg text-black w-full h-28"
              autoFocus
            />
          )}
        </AnimatePresence>
      </div>

      <div className="flex justify-between w-full rounded-lg p-2 mt-2 bg-black bg-opacity-25">
        {!isEditing ? (
          <>
            <button
              className="text-yellow-400 hover:text-yellow-500"
              onClick={() => setIsEditing(true)}
              aria-label="Edit Note"
            >
              <Edit2 />
            </button>
            <button
              className="text-red-400 hover:text-red-500"
              onClick={() => deleteNote(id)}
              aria-label="Delete Note"
            >
              <Trash />
            </button>
            <button
              className="text-green-400 hover:text-green-500"
              onClick={handleDownload}
              aria-label="Download Note"
            >
              <Save />
            </button>
          </>
        ) : (
          <>
            <button
              className="text-green-400 hover:text-green-500"
              onClick={saveEdit}
              aria-label="Save Edit"
            >
              <Save />
            </button>
            <button
              className="text-red-400 hover:text-red-500"
              onClick={cancelEdit}
              aria-label="Cancel Edit"
            >
              <X />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default NotesCard;
