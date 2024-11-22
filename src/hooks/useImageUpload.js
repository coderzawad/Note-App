import { useState, useCallback } from 'react';

export const useImageUpload = (initialImages = []) => {
  const [images, setImages] = useState(initialImages);

  const convertToBase64 = useCallback((file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }, []);

  const handleImageUpload = useCallback(async (acceptedFiles) => {
    try {
      const base64Images = await Promise.all(
        acceptedFiles.map(file => convertToBase64(file))
      );
      setImages(prev => [...prev, ...base64Images]);
      return base64Images;
    } catch (error) {
      console.error('Error converting images:', error);
      return [];
    }
  }, []);

  const removeImage = useCallback((index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  }, []);

  return { images, handleImageUpload, removeImage, setImages };
};