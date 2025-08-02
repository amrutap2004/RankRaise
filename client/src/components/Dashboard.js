import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ProgressVisualization from './ProgressVisualization';
import InteractiveInfographic from './InteractiveInfographic';

const Dashboard = ({ user }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState('');
  const [message, setMessage] = useState('');

  const fetchDashboardData = useCallback(async () => {
    try {
      const response = await axios.get(`/api/dashboard/${user.email}`);
      if (response.data.success) {
        setDashboardData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [user.email]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    if (!donationAmount || donationAmount <= 0) {
      setMessage('Please enter a valid amount');
      return;
    }

    try {
      const response = await axios.put(`/api/donations/${user.email}`, {
        amount: parseInt(donationAmount)
      });
      
      if (response.data.success) {
        setMessage('Donation added successfully!');
        setDonationAmount('');
        fetchDashboardData(); // Refresh data
      }
    } catch (error) {
      setMessage('Error adding donation. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="text-center" style={{ marginTop: '100px' }}>
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  const data = dashboardData || user;

  return (
    <div>
      <h1 className="text-center mb-4">Welcome to RankRaise</h1>
      
      <div className="dashboard-grid">
        <div className="stat-card">
          <h3>{data.name}</h3>
          <p>Intern Name</p>
        </div>
        
        <div className="stat-card">
          <h3>{data.referralCode}</h3>
          <p>Your Referral Code</p>
        </div>
        
        <div className="stat-card">
          <h3>${data.totalDonations?.toLocaleString() || '0'}</h3>
          <p>Total Donations Raised</p>
        </div>
      </div>

      <div className="card">
        <h2>Add New Donation</h2>
        <form onSubmit={handleDonationSubmit}>
          <div className="form-group">
            <label htmlFor="donationAmount">Donation Amount ($)</label>
            <input
              type="number"
              id="donationAmount"
              className="form-control"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              placeholder="Enter amount"
              min="1"
            />
          </div>
          <button type="submit" className="btn">
            Add Donation
          </button>
        </form>
        {message && (
          <div style={{ 
            marginTop: '16px',
            padding: '12px',
            borderRadius: '8px',
            background: message.includes('successfully') ? '#d4edda' : '#f8d7da',
            color: message.includes('successfully') ? '#155724' : '#721c24'
          }}>
            {message}
          </div>
        )}
      </div>

      <div className="card">
        <h2>Your Rewards & Unlockables</h2>
        <div className="rewards-grid">
          {data.rewards?.map((reward, index) => (
            <div key={index} className="reward-item">
              <h4>{reward}</h4>
              <p>🎉 Unlocked!</p>
            </div>
          )) || (
            <>
              <div className="reward-item">
                <h4>Bronze Badge</h4>
                <p>🎉 Unlocked!</p>
              </div>
              <div className="reward-item">
                <h4>First Donation</h4>
                <p>🎉 Unlocked!</p>
              </div>
              <div className="reward-item">
                <h4>Silver Badge</h4>
                <p>🔒 Locked (Need $5000)</p>
              </div>
              <div className="reward-item">
                <h4>Gold Badge</h4>
                <p>🔒 Locked (Need $10000)</p>
              </div>
              <div className="reward-item">
                <h4>Platinum Badge</h4>
                <p>🔒 Locked (Need $15000)</p>
              </div>
              <div className="reward-item">
                <h4>Diamond Badge</h4>
                <p>🔒 Locked (Need $20000)</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="card">
        <h2>Quick Stats</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div style={{ textAlign: 'center', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
            <h4>Current Rank</h4>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
              #{Math.floor(Math.random() * 10) + 1}
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
            <h4>Days Active</h4>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
              {Math.floor(Math.random() * 30) + 1}
            </p>
          </div>
          <div style={{ textAlign: 'center', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
            <h4>Referrals</h4>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#667eea' }}>
              {Math.floor(Math.random() * 5) + 1}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Pictures Section */}
      <div className="card">
        <ProgressVisualization 
          userData={data} 
          totalDonations={data.totalDonations || 0}
        />
      </div>

      {/* Interactive Infographic Section */}
      <div className="card">
        <InteractiveInfographic data={data} />
      </div>
    </div>
  );
};

export default Dashboard; 