// ImageCarousel.tsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

const ImageCarousel = () => {
  const [images, setImages] = useState<string[]>([]);

  // данные будем получать из пропсов(родит компонента)
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/images');
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}> {/* Устанавливаем максимальную ширину и центрируем карусель */}
      <Carousel>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={`data:image/jpeg;base64,${image}`}
              alt={`Slide ${index}`}
              style={{ maxHeight: '400px', objectFit: 'cover' }} // Устанавливаем максимальную высоту и подгоняем размер изображения под слайд
            />
            <Carousel.Caption>
              <h3>Slide {index + 1}</h3>
              <p>Some description for slide {index + 1}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
