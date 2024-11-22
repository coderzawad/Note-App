import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { TrashIcon, PencilIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const NoteCard = ({ note, onEdit, onDelete, index }) => (
  <motion.div
    layoutId={`note-${note.id}`}
    className="note-card group"
    style={{ '--delay': `${index * 0.1}s` }}
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 }
    }}
  >
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-semibold text-notes-accent">{note.title}</h3>
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
    
    {note.images?.length > 0 && (
      <div className="mb-4 grid grid-cols-2 gap-2">
        {note.images.slice(0, 2).map((image, idx) => (
          <div key={idx} className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src={image}
              alt={`Note image ${idx + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
        {note.images.length > 2 && (
          <div className="absolute bottom-2 right-2 bg-black/50 text-white text-sm px-2 py-1 rounded-full">
            +{note.images.length - 2}
          </div>
        )}
      </div>
    )}
    
    <p className="text-gray-700 mb-4 line-clamp-3 leading-relaxed">{note.content}</p>
    
    <div className="flex justify-between items-center">
      <div className="text-sm text-notes-primary/80 font-medium">
        {format(new Date(note.date), 'MMM d, yyyy')}
      </div>
      <Link
        to={`/note/${note.id}`}
        className="flex items-center gap-1 text-notes-primary hover:text-notes-accent transition-colors"
      >
        View Note
        <ArrowRightIcon className="w-4 h-4" />
      </Link>
    </div>
  </motion.div>
);

export default React.memo(NoteCard);