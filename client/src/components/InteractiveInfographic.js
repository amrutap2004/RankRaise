import React, { useState, useEffect } from 'react';

const InteractiveInfographic = ({ data }) => {
  const [activeSection, setActiveSection] = useState(null);
  const [animatedValues, setAnimatedValues] = useState({
    totalDonations: 0,
    goalProgress: 0,
    daysActive: 0,
    referrals: 0
  });

  useEffect(() => {
    // Animate values on component mount
    const animateValues = () => {
      const targetValues = {
        totalDonations: data?.totalDonations || 0,
        goalProgress: Math.min(((data?.totalDonations || 0) / 20000) * 100, 100),
        daysActive: data?.daysActive || Math.floor(Math.random() * 30) + 1,
        referrals: data?.referrals || Math.floor(Math.random() * 5) + 1
      };

      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setAnimatedValues({
          totalDonations: Math.floor(targetValues.totalDonations * progress),
          goalProgress: targetValues.goalProgress * progress,
          daysActive: Math.floor(targetValues.daysActive * progress),
          referrals: Math.floor(targetValues.referrals * progress)
        });

        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepDuration);

      return () => clearInterval(interval);
    };

    animateValues();
  }, [data]);

  const infographicSections = [
    {
      id: 'donations',
      title: '💰 Total Donations',
      value: `$${animatedValues.totalDonations.toLocaleString()}`,
      description: 'Funds raised for the cause',
      color: '#667eea',
      icon: '💝'
    },
    {
      id: 'progress',
      title: '📊 Goal Progress',
      value: `${animatedValues.goalProgress.toFixed(1)}%`,
      description: 'Progress towards $20,000 goal',
      color: '#28a745',
      icon: '🎯'
    },
    {
      id: 'activity',
      title: '📅 Days Active',
      value: animatedValues.daysActive,
      description: 'Days since joining the program',
      color: '#ffc107',
      icon: '🌟'
    },
    {
      id: 'referrals',
      title: '👥 Referrals',
      value: animatedValues.referrals,
      description: 'People you\'ve referred',
      color: '#dc3545',
      icon: '🤝'
    }
  ];

  const handleSectionClick = (sectionId) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <div className="interactive-infographic" style={{
      padding: '20px',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      borderRadius: '16px',
      margin: '20px 0'
    }}>
      <h3 style={{ 
        textAlign: 'center', 
        marginBottom: '30px', 
        color: '#333',
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        📈 Your Impact Dashboard
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        {infographicSections.map((section) => (
          <div
            key={section.id}
            className={`infographic-section ${activeSection === section.id ? 'active' : ''}`}
            style={{
              background: 'white',
              padding: '25px',
              borderRadius: '12px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: `3px solid ${activeSection === section.id ? section.color : 'transparent'}`,
              position: 'relative',
              overflow: 'hidden'
            }}
            onClick={() => handleSectionClick(section.id)}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-5px)';
              e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
            }}
          >
            {/* Animated background effect */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(45deg, ${section.color}10, ${section.color}20)`,
              opacity: activeSection === section.id ? 1 : 0,
              transition: 'opacity 0.3s ease'
            }} />

            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ 
                fontSize: '48px', 
                marginBottom: '15px',
                animation: activeSection === section.id ? 'pulse 1s ease-in-out infinite' : 'none'
              }}>
                {section.icon}
              </div>
              
              <h4 style={{ 
                margin: '0 0 10px 0', 
                color: '#333',
                fontSize: '18px',
                fontWeight: '600'
              }}>
                {section.title}
              </h4>
              
              <div style={{ 
                fontSize: '32px', 
                fontWeight: 'bold', 
                color: section.color,
                marginBottom: '8px',
                textShadow: activeSection === section.id ? '0 0 10px rgba(0,0,0,0.1)' : 'none'
              }}>
                {section.value}
              </div>
              
              <p style={{ 
                margin: '0', 
                color: '#666', 
                fontSize: '14px',
                opacity: activeSection === section.id ? 1 : 0.8
              }}>
                {section.description}
              </p>
            </div>

            {/* Interactive hotspot indicators */}
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: activeSection === section.id ? section.color : '#ddd',
              animation: activeSection === section.id ? 'glow 1s ease-in-out infinite' : 'none'
            }} />
          </div>
        ))}
      </div>

      {/* Progress Circle Visualization */}
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <h4 style={{ marginBottom: '20px', color: '#333' }}>🎯 Goal Progress Circle</h4>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
            {/* Background circle */}
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#e9ecef"
              strokeWidth="12"
            />
            {/* Progress circle */}
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="#667eea"
              strokeWidth="12"
              strokeDasharray={`${2 * Math.PI * 80}`}
              strokeDashoffset={`${2 * Math.PI * 80 * (1 - animatedValues.goalProgress / 100)}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>
          
          {/* Center text */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea' }}>
              {animatedValues.goalProgress.toFixed(1)}%
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              Complete
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Tips */}
      {activeSection && (
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: 'rgba(102, 126, 234, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(102, 126, 234, 0.2)',
          animation: 'slideIn 0.3s ease-out'
        }}>
          <h5 style={{ margin: '0 0 10px 0', color: '#667eea' }}>
            💡 Tips for {activeSection === 'donations' ? 'increasing donations' :
                        activeSection === 'progress' ? 'reaching your goal' :
                        activeSection === 'activity' ? 'staying active' : 'getting referrals'}
          </h5>
          <p style={{ margin: '0', fontSize: '14px', color: '#666' }}>
            {activeSection === 'donations' ? 'Share your fundraising page on social media and reach out to friends and family.' :
             activeSection === 'progress' ? 'Set smaller milestones and celebrate each achievement along the way.' :
             activeSection === 'activity' ? 'Log in daily to track your progress and stay motivated.' :
             'Invite friends to join the program and earn bonus rewards together.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default InteractiveInfographic; 