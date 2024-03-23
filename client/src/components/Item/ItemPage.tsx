import axios from 'axios';
import React, { useState } from 'react';


const ItemPage = () => {

    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files && event.target.files[0];
      if (file) {
        setSelectedImage(file);
      }
    };
  
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      
      if (!selectedImage) {
        console.error('No image selected.');
        return;
      }
      
      const formData = new FormData();
      formData.append('images', selectedImage);
      
      try {
        const response = await axios.post('http://localhost:3000/uploadImages', formData);
        console.log('Image uploaded successfully:', response.data.imageUrl);
        // Дополнительная логика по обработке успешной загрузки изображения
      } catch (error) {
        console.error('Error uploading image:', error);
        // Дополнительная логика по обработке ошибки загрузки изображения
      }
    };
  
    return (
      <form onSubmit={handleFormSubmit}>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button type="submit">Upload Image</button>
      </form>
    );
};

export default ItemPage;
