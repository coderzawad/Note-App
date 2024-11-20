import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

function NoteList({ notes, onEdit, onDelete }) {
  if (notes.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <div className="glass-morph p-12 max-w-lg mx-auto">
          <p className="text-2xl text-notes-dark/80 font-medium">
            No notes yet. Start creating!
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {notes.map((note, index) => (
        <motion.div
          key={note.id}
          variants={item}
          layoutId={`note-${note.id}`}
          className="note-card group"
          style={{ '--delay': `${index * 0.1}s` }}
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold title-gradient">{note.title}</h3>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onEdit(note)}
                className="p-2 rounded-full hover:bg-notes-primary/10 transition-colors duration-300"
              >
                <PencilIcon className="w-5 h-5 text-notes-primary" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(note.id)}
                className="p-2 rounded-full hover:bg-red-500/10 transition-colors duration-300"
              >
                <TrashIcon className="w-5 h-5 text-red-500" />
              </motion.button>
            </div>
          </div>
          <p className="text-notes-dark/80 mb-4 line-clamp-3">{note.content}</p>
          <div className="text-sm text-notes-dark/60 font-medium">
            {format(new Date(note.date), 'MMM d, yyyy')}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default NoteList;