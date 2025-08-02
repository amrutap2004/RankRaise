import React, { useState } from 'react';

const InteractivePicture = ({ 
  imageSrc, 
  hotspots = [], 
  onHotspotClick, 
  className = "",
  alt = "Interactive Picture"
}) => {
  const [hoveredHotspot, setHoveredHotspot] = useState(null);

  const handleHotspotClick = (hotspot) => {
    if (onHotspotClick) {
      onHotspotClick(hotspot);
    }
  };

  return (
    <div className={`interactive-picture-container ${className}`} style={{ position: 'relative', display: 'inline-block' }}>
      <img 
        src={imageSrc} 
        alt={alt}
        style={{ 
          maxWidth: '100%', 
          height: 'auto',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}
      />
      
      {hotspots.map((hotspot, index) => (
        <div
          key={index}
          className={`hotspot ${hoveredHotspot === index ? 'hovered' : ''}`}
          style={{
            position: 'absolute',
            left: `${hotspot.x}%`,
            top: `${hotspot.y}%`,
            width: '30px',
            height: '30px',
            borderRadius: '50%',
            background: hoveredHotspot === index ? '#ff6b6b' : '#667eea',
            border: '3px solid white',
            cursor: 'pointer',
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            zIndex: 10
          }}
          onClick={() => handleHotspotClick(hotspot)}
          onMouseEnter={() => setHoveredHotspot(index)}
          onMouseLeave={() => setHoveredHotspot(null)}
          title={hotspot.title}
        >
          <div style={{
            position: 'absolute',
            top: '-40px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            opacity: hoveredHotspot === index ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none'
          }}>
            {hotspot.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InteractivePicture; 