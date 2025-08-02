import React, { useState } from 'react';
import InteractivePicture from './InteractivePicture';

const ProgressVisualization = ({ userData, totalDonations = 0 }) => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Calculate progress percentage
  const progressPercentage = Math.min((totalDonations / 20000) * 100, 100);
  
  // Define achievement levels
  const achievements = [
    { level: 'Bronze', threshold: 0, icon: '🥉', color: '#cd7f32' },
    { level: 'Silver', threshold: 5000, icon: '🥈', color: '#c0c0c0' },
    { level: 'Gold', threshold: 10000, icon: '🥇', color: '#ffd700' },
    { level: 'Platinum', threshold: 15000, icon: '💎', color: '#e5e4e2' },
    { level: 'Diamond', threshold: 20000, icon: '💎', color: '#b9f2ff' }
  ];

  // Create interactive hotspots for the progress visualization
  const progressHotspots = achievements.map((achievement, index) => ({
    x: 20 + (index * 15), // Spread across the image
    y: 50,
    title: `${achievement.icon} ${achievement.level}`,
    data: achievement,
    unlocked: totalDonations >= achievement.threshold
  }));

  // Create a virtual office environment hotspots
  const officeHotspots = [
    {
      x: 25,
      y: 30,
      title: "🏆 Achievement Wall",
      description: "Your badges and accomplishments are displayed here"
    },
    {
      x: 75,
      y: 40,
      title: "📊 Progress Dashboard",
      description: "Real-time tracking of your fundraising progress"
    },
    {
      x: 50,
      y: 70,
      title: "💝 Donation Station",
      description: "Where you record new donations and track impact"
    },
    {
      x: 15,
      y: 60,
      title: "🎯 Goal Tracker",
      description: "Visual representation of your fundraising goals"
    }
  ];

  const handleHotspotClick = (hotspot) => {
    if (hotspot.data) {
      setSelectedAchievement(hotspot);
      setShowModal(true);
    }
  };

  return (
    <div className="progress-visualization">
      <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#667eea' }}>
        Your Fundraising Journey
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
        
        {/* Progress Mountain Visualization */}
        <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
          <h4>🏔️ Progress Mountain</h4>
          <div style={{ position: 'relative', margin: '20px 0' }}>
            <svg width="400" height="200" style={{ maxWidth: '100%' }}>
              {/* Mountain base */}
              <polygon 
                points="50,180 350,180 200,50" 
                fill="#8B4513" 
                stroke="#654321" 
                strokeWidth="2"
              />
              {/* Snow cap */}
              <polygon 
                points="180,60 220,60 200,30" 
                fill="white" 
                stroke="#ddd" 
                strokeWidth="1"
              />
              {/* Progress overlay */}
              <polygon 
                points={`50,180 350,180 ${200 - (progressPercentage * 1.5)},${180 - (progressPercentage * 1.3)}`}
                fill="rgba(102, 126, 234, 0.6)"
                stroke="rgba(102, 126, 234, 0.8)"
                strokeWidth="2"
              />
            </svg>
            
            {/* Interactive hotspots on the mountain */}
            {progressHotspots.map((hotspot, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  width: '25px',
                  height: '25px',
                  borderRadius: '50%',
                  background: hotspot.unlocked ? hotspot.data.color : '#ccc',
                  border: '2px solid white',
                  cursor: 'pointer',
                  transform: 'translate(-50%, -50%)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                  zIndex: 10
                }}
                onClick={() => handleHotspotClick(hotspot)}
                title={hotspot.title}
              >
                <span style={{ fontSize: '12px' }}>{hotspot.data.icon}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '14px', color: '#666' }}>
            Progress: ${totalDonations.toLocaleString()} / $20,000 ({progressPercentage.toFixed(1)}%)
          </p>
        </div>

        {/* Virtual Office Environment */}
        <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
          <h4>🏢 Your Virtual Office</h4>
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px',
            padding: '20px',
            color: 'white',
            position: 'relative',
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>🏢</div>
            <div style={{ textAlign: 'center' }}>
              <h5 style={{ margin: '0 0 10px 0' }}>Interactive Office Space</h5>
              <p style={{ margin: '0', fontSize: '14px' }}>
                Click on different areas to explore your workspace
              </p>
            </div>
            
            {/* Office hotspots */}
            {officeHotspots.map((hotspot, index) => (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.3)',
                  border: '2px solid white',
                  cursor: 'pointer',
                  transform: 'translate(-50%, -50%)',
                  transition: 'all 0.3s ease',
                  zIndex: 10
                }}
                title={hotspot.title}
              >
                <div style={{
                  position: 'absolute',
                  top: '-30px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(0,0,0,0.8)',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  whiteSpace: 'nowrap',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: 'none'
                }}>
                  {hotspot.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievement Gallery */}
        <div className="card" style={{ textAlign: 'center', padding: '20px' }}>
          <h4>🏆 Achievement Gallery</h4>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', 
            gap: '15px',
            marginTop: '15px'
          }}>
            {achievements.map((achievement, index) => (
              <div
                key={index}
                style={{
                  padding: '15px',
                  borderRadius: '8px',
                  background: totalDonations >= achievement.threshold 
                    ? `linear-gradient(135deg, ${achievement.color}20, ${achievement.color}40)`
                    : '#f8f9fa',
                  border: `2px solid ${totalDonations >= achievement.threshold ? achievement.color : '#ddd'}`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  opacity: totalDonations >= achievement.threshold ? 1 : 0.5
                }}
                onClick={() => handleHotspotClick({ data: achievement, title: achievement.level })}
              >
                <div style={{ fontSize: '24px', marginBottom: '5px' }}>
                  {achievement.icon}
                </div>
                <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
                  {achievement.level}
                </div>
                <div style={{ fontSize: '10px', color: '#666' }}>
                  ${achievement.threshold.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for achievement details */}
      {showModal && selectedAchievement && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '30px',
            borderRadius: '12px',
            maxWidth: '400px',
            textAlign: 'center',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '15px' }}>
              {selectedAchievement.data.icon}
            </div>
            <h3 style={{ margin: '0 0 10px 0', color: selectedAchievement.data.color }}>
              {selectedAchievement.data.level} Achievement
            </h3>
            <p style={{ margin: '0 0 20px 0', color: '#666' }}>
              {selectedAchievement.unlocked 
                ? `Congratulations! You've unlocked the ${selectedAchievement.data.level} achievement by raising $${selectedAchievement.data.threshold.toLocaleString()}.`
                : `Raise $${selectedAchievement.data.threshold.toLocaleString()} to unlock this achievement.`
              }
            </p>
            <button
              onClick={() => setShowModal(false)}
              style={{
                background: '#667eea',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressVisualization; 