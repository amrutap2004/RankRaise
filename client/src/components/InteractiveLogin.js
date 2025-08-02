import React, { useState, useEffect } from 'react';

const InteractiveLogin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [animatedElements, setAnimatedElements] = useState([]);

  useEffect(() => {
    // Create floating animation elements
    const elements = [
      { id: 1, x: 10, y: 20, emoji: '💝', delay: 0 },
      { id: 2, x: 80, y: 15, emoji: '🏆', delay: 1 },
      { id: 3, x: 20, y: 80, emoji: '🌟', delay: 2 },
      { id: 4, x: 85, y: 75, emoji: '🎯', delay: 3 },
      { id: 5, x: 50, y: 10, emoji: '💎', delay: 4 },
      { id: 6, x: 15, y: 60, emoji: '🥇', delay: 5 }
    ];
    setAnimatedElements(elements);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        onLogin(data.user);
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setEmail('demo@intern.com');
    setPassword('password123');
    setTimeout(() => {
      handleSubmit({ preventDefault: () => {} });
    }, 500);
  };

  return (
    <div className="login-container" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background elements */}
      {animatedElements.map((element) => (
        <div
          key={element.id}
          style={{
            position: 'absolute',
            left: `${element.x}%`,
            top: `${element.y}%`,
            fontSize: '24px',
            animation: `float 3s ease-in-out infinite`,
            animationDelay: `${element.delay}s`,
            opacity: 0.6,
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          {element.emoji}
        </div>
      ))}

      {/* Interactive Login Card */}
      <div className="login-card" style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)',
        maxWidth: '400px',
        width: '90%',
        position: 'relative',
        zIndex: 10
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🚀</div>
          <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>Welcome to RankRaise!</h2>
          <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
            Enter your credentials to access your fundraising dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#333', 
              fontWeight: '500' 
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your email"
              required
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#333', 
              fontWeight: '500' 
            }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your password"
              required
            />
          </div>

          {message && (
            <div style={{
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
              background: message.includes('failed') || message.includes('error') 
                ? '#f8d7da' 
                : '#d4edda',
              color: message.includes('failed') || message.includes('error') 
                ? '#721c24' 
                : '#155724',
              textAlign: 'center'
            }}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              transition: 'all 0.3s ease',
              marginBottom: '15px'
            }}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <button
            type="button"
            onClick={handleDemoLogin}
            style={{
              width: '100%',
              padding: '12px',
              background: 'transparent',
              color: '#667eea',
              border: '2px solid #667eea',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            🚀 Try Demo Account
          </button>
        </form>

        {/* Interactive Features */}
        <div style={{ 
          marginTop: '30px', 
          padding: '20px', 
          background: 'rgba(102, 126, 234, 0.1)', 
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <h4 style={{ margin: '0 0 15px 0', color: '#667eea' }}>🎯 Quick Features</h4>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '10px' 
          }}>
            <div style={{ 
              padding: '10px', 
              background: 'white', 
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              fontSize: '12px'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              💰 Track Donations
            </div>
            <div style={{ 
              padding: '10px', 
              background: 'white', 
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              fontSize: '12px'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              🏆 Earn Badges
            </div>
            <div style={{ 
              padding: '10px', 
              background: 'white', 
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              fontSize: '12px'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              📊 View Progress
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
};

export default InteractiveLogin; 