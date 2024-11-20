import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon, CheckIcon } from '@heroicons/react/24/solid';

function NoteEditor({ note, onSave, onCancel }) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: note?.id || Date.now(),
      title,
      content,
      date: note?.date || new Date().toISOString(),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto"
    >
      <form onSubmit={handleSubmit} className="glass-morph p-8">
        <div className="mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field text-2xl font-semibold"
            placeholder="Note Title"
            required
          />
        </div>
        <div className="mb-8">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input-field min-h-[300px] resize-none"
            placeholder="Write your note here..."
            required
          />
        </div>
        <div className="flex justify-end gap-4">
          <motion.button
            type="button"
            onClick={onCancel}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary bg-notes-dark/10 text-notes-dark hover:bg-notes-dark/20"
          >
            <span className="flex items-center gap-2">
              <XMarkIcon className="w-5 h-5" />
              Cancel
            </span>
          </motion.button>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-white"
          >
            <span className="flex items-center gap-2">
              <CheckIcon className="w-5 h-5" />
              Save Note
            </span>
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
}

export default NoteEditor;