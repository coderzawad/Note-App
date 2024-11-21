  import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { ArrowLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

function NoteDetail({ notes, onEdit, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [noteImages, setNoteImages] = useState([]);

  // Find the note based on the ID
  const note = notes.find((n) => n.id.toString() === id);

  // Fetch images from localStorage
  useEffect(() => {
    if (note) {
      const savedImages = localStorage.getItem(`note-images-${note.id}`);
      if (savedImages) {
        setNoteImages(JSON.parse(savedImages));
      }
    }
  }, [note]);

  if (!note) {
    return (
      <div className="text-center text-white">
        Note not found
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="glass-morph p-8">
        <div className="flex items-center justify-between mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-notes-primary hover:text-notes-accent transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Notes
          </motion.button>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onEdit(note);
                navigate('/');
              }}
              className="p-2 rounded-full hover:bg-notes-primary/10 transition-colors"
            >
              <PencilIcon className="w-5 h-5 text-notes-primary" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onDelete(note.id);
                navigate('/');
              }}
              className="p-2 rounded-full hover:bg-red-500/10 transition-colors"
            >
              <TrashIcon className="w-5 h-5 text-red-500" />
            </motion.button>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-notes-accent mb-4">{note.title}</h1>
        <p className="text-sm text-notes-primary/80 font-medium mb-8">
          {format(new Date(note.date), 'MMMM d, yyyy')}
        </p>

        {noteImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {noteImages.map((image, index) => (
              <motion.img
                key={index}
                src={image.base64} // Use `base64` if stored in that format
                alt={`Note image ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: 'tween' }}
              />
            ))}
          </div>
        )}

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{note.content}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default NoteDetail;

