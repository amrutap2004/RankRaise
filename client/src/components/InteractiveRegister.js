import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const InteractiveRegister = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      
      if (response.data.success) {
        onLogin(response.data.user);
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: '🚀',
      title: 'Join the Movement',
      description: 'Be part of our fundraising community'
    },
    {
      icon: '🏆',
      title: 'Compete & Win',
      description: 'Climb the leaderboard and earn rewards'
    },
    {
      icon: '📊',
      title: 'Track Progress',
      description: 'Monitor your fundraising journey'
    },
    {
      icon: '🎯',
      title: 'Set Goals',
      description: 'Achieve your fundraising targets'
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '100px',
        height: '100px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '15%',
        width: '80px',
        height: '80px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '20%',
        width: '120px',
        height: '120px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '50%',
        animation: 'float 7s ease-in-out infinite'
      }}></div>

      <div style={{
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        maxWidth: '500px',
        width: '100%',
        position: 'relative',
        zIndex: 10,
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🌟</div>
          <h2 style={{ margin: '0 0 10px 0', color: '#333' }}>Join RankRaise!</h2>
          <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
            Create your account and start your fundraising journey
          </p>
        </div>

        {error && (
          <div style={{
            background: '#f8d7da',
            color: '#721c24',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              placeholder="Enter your full name"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              placeholder="Enter your email"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              placeholder="Create a password (min 6 characters)"
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '500' }}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="6"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e5e9',
                borderRadius: '8px',
                fontSize: '16px',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
              placeholder="Confirm your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '15px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              opacity: loading ? 0.7 : 1
            }}
            onMouseEnter={(e) => !loading && (e.target.style.transform = 'translateY(-2px)', e.target.style.boxShadow = '0 8px 25px rgba(102,126,234,0.3)')}
            onMouseLeave={(e) => !loading && (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = 'none')}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ 
              color: '#667eea', 
              textDecoration: 'none', 
              fontWeight: '600',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.color = '#764ba2'}
            onMouseLeave={(e) => e.target.style.color = '#667eea'}
            >
              Login here
            </Link>
          </p>
        </div>

        {/* Feature Cards */}
        <div style={{ 
          marginTop: '40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px'
        }}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                background: 'rgba(102,126,234,0.1)',
                padding: '20px',
                borderRadius: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: selectedFeature === index ? '2px solid #667eea' : '2px solid transparent'
              }}
              onMouseEnter={() => setSelectedFeature(index)}
              onMouseLeave={() => setSelectedFeature(null)}
              onClick={() => setSelectedFeature(index)}
            >
              <div style={{ fontSize: '32px', marginBottom: '10px' }}>{feature.icon}</div>
              <h4 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '14px' }}>{feature.title}</h4>
              <p style={{ margin: '0', color: '#666', fontSize: '12px' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveRegister; 