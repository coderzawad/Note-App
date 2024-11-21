import React from 'react';
import { motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import NoteList from './components/NoteList';
import NoteEditor from './components/NoteEditor';
import NoteDetail from './components/NoteDetail';
import { useNotes } from './hooks/useNotes';
import { PlusIcon } from '@heroicons/react/24/outline';

function AppContent() {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingNote, setEditingNote] = React.useState(null);
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const location = useLocation();

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsEditing(true);
  };

  const handleSaveNote = (note) => {
    if (editingNote) {
      updateNote(note);
    } else {
      addNote(note);
    }
    setIsEditing(false);
    setEditingNote(null);
  };

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8 max-w-7xl"
      >
        <header className="text-center mb-12 relative">
          <motion.h1 
            className="text-6xl font-bold text-white mb-6 tracking-tight"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <span className="title-gradient">Notes</span>
          </motion.h1>
        </header>

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <>
                {!isEditing && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary fixed bottom-8 right-8 z-10"
                    onClick={() => setIsEditing(true)}
                  >
                    <span className="flex items-center gap-2">
                      <PlusIcon className="w-5 h-5" />
                      Create Note
                    </span>
                  </motion.button>
                )}
                {isEditing ? (
                  <NoteEditor
                    note={editingNote}
                    onSave={handleSaveNote}
                    onCancel={() => {
                      setIsEditing(false);
                      setEditingNote(null);
                    }}
                  />
                ) : (
                  <NoteList
                    notes={notes}
                    onEdit={handleEditNote}
                    onDelete={deleteNote}
                  />
                )}
              </>
            } />
            <Route path="/note/:id" element={<NoteDetail notes={notes} />} />
          </Routes>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
