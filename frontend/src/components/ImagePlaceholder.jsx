import React from 'react';

function ImagePlaceholder({ alt, height = '300px', imageUrl = null }) {
  if (imageUrl) {
    return (
      <img 
        src={imageUrl} 
        alt={alt}
        style={{
          height,
          width: '100%',
          objectFit: 'cover',
          borderRadius: '12px',
          display: 'block',
        }}
      />
    );
  }

  return (
    <div 
      style={{
        height,
        background: 'linear-gradient(135deg, rgba(26, 162, 224, 0.1), rgba(245, 168, 96, 0.1))',
        border: '2px dashed rgba(26, 162, 224, 0.3)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#0d6fb8',
        fontSize: '14px',
        fontWeight: '600',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      📷 {alt}
    </div>
  );
}

export default ImagePlaceholder;
