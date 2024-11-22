import { useState, useEffect } from 'react';

export function useNotes() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes(prev => [...prev, { ...note, id: Date.now(), images: note.images || [] }]);
  };

  const updateNote = (updatedNote) => {
    setNotes(prev => prev.map(note => 
      note.id === updatedNote.id ? { ...updatedNote, images: updatedNote.images || [] } : note
    ));
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  return { notes, addNote, updateNote, deleteNote };
}