import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon, CheckIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useDropzone } from 'react-dropzone';

function NoteEditor({ note, onSave, onCancel }) {
  const [noteId, setNoteId] = useState(note?.id || 'new-note');
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [images, setImages] = useState(() => {
    const savedImages = localStorage.getItem(`note-images-${note?.id || 'new-note'}`);
    return savedImages ? JSON.parse(savedImages) : [];
  });

  const persistImages = (images) => {
    localStorage.setItem(`note-images-${noteId}`, JSON.stringify(images));
  };

  const handleSave = () => {
    const newId = note?.id || Date.now(); // Generate unique ID if it's a new note
    const savedNote = {
      id: newId,
      title,
      content,
      images,
      date: note?.date || new Date().toISOString(),
    };

    // If the note ID has changed, migrate the images in localStorage
    if (noteId !== newId) {
      const oldKey = `note-images-${noteId}`;
      const newKey = `note-images-${newId}`;
      localStorage.setItem(newKey, localStorage.getItem(oldKey)); // Copy data to new key
      localStorage.removeItem(oldKey); // Remove old key
      setNoteId(newId); // Update state with the new ID
    }

    onSave(savedNote);
  };

  const handleImageRemove = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    persistImages(updatedImages);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) => ({
        name: file.name,
        base64: URL.createObjectURL(file),
      }));
      const allImages = [...images, ...newImages];
      setImages(allImages);
      persistImages(allImages);
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="glass-morph p-8"
      >
        <div className="mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field text-2xl font-semibold text-notes-accent placeholder-notes-accent/50"
            placeholder="Note Title"
            required
          />
        </div>
        <div className="mb-8">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input-field min-h-[300px] resize-none text-gray-700 placeholder-gray-400"
            placeholder="Write your note here..."
            required
          />
        </div>

        <div className="mb-8">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-notes-primary bg-notes-primary/10' : 'border-gray-300 hover:border-notes-primary'}`}
          >
            <input {...getInputProps()} />
            <PhotoIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">
              {isDragActive ? 'Drop images here' : 'Drag & drop images here, or click to select'}
            </p>
          </div>

          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden group">
                  <img
                    src={image.base64}
                    alt={`Upload preview ${image.name}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <motion.button
            type="button"
            onClick={onCancel}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 rounded-full font-semibold transition-all duration-300 bg-gray-100 text-gray-600 hover:bg-gray-200"
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
            className="btn-primary"
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

