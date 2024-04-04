import React from 'react';
import Image from 'react-bootstrap/Image';

function SingleImageCarousel({ imageUrl }) {
  return (
    <div style={{ 
      width: '100%', 
      height: '400px', 
      backgroundColor: '#f0f0f0', 
      position: 'relative', 
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Image 
        src={imageUrl} 
        style={{ width: '90%', height: '90%', objectFit: 'cover' }} 
        fluid 
      />
    </div>
  );
}

export default SingleImageCarousel;
