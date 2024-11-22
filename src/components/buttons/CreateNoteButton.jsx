import React from 'react';
import { motion } from 'framer-motion';
import { PlusIcon } from '@heroicons/react/24/outline';

const CreateNoteButton = ({ onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="btn-primary fixed bottom-8 right-8 z-10"
    onClick={onClick}
  >
    <span className="flex items-center gap-2">
      <PlusIcon className="w-5 h-5" />
      Create Note
    </span>
  </motion.button>
);

export default React.memo(CreateNoteButton);