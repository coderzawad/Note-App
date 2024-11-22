import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNotes } from './hooks/useNotes';
import Header from './components/layout/Header';

// Lazy load components
const NoteList = lazy(() => import('./components/NoteList'));
const NoteEditor = lazy(() => import('./components/NoteEditor'));
const NoteDetail = lazy(() => import('./components/NoteDetail'));
const CreateNoteButton = lazy(() => import('./components/buttons/CreateNoteButton'));

// Loading fallback
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-notes-primary"></div>
  </div>
);

function AppContent() {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editingNote, setEditingNote] = React.useState(null);
  const { notes, addNote, updateNote, deleteNote } = useNotes();

  const handleEditNote = React.useCallback((note) => {
    setEditingNote(note);
    setIsEditing(true);
  }, []);

  const handleSaveNote = React.useCallback((note) => {
    if (editingNote) {
      updateNote(note);
    } else {
      addNote(note);
    }
    setIsEditing(false);
    setEditingNote(null);
  }, [editingNote, updateNote, addNote]);

  const handleCancel = React.useCallback(() => {
    setIsEditing(false);
    setEditingNote(null);
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Header />
        
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={
              <>
                {!isEditing && (
                  <CreateNoteButton onClick={() => setIsEditing(true)} />
                )}
                {isEditing ? (
                  <NoteEditor
                    note={editingNote}
                    onSave={handleSaveNote}
                    onCancel={handleCancel}
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
            <Route path="/note/:id" element={
              <NoteDetail 
                notes={notes} 
                onEdit={handleEditNote}
                onDelete={deleteNote}
              />
            } />
          </Routes>
        </Suspense>
      </div>
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