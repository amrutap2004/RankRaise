import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('/api/leaderboard');
      if (response.data.success) {
        setLeaderboard(response.data.leaderboard);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      // Fallback to dummy data if API fails
      setLeaderboard([
        { name: 'Sarah Johnson', referralCode: 'sarah2025', totalDonations: 15420, rank: 1 },
        { name: 'Mike Chen', referralCode: 'mike2025', totalDonations: 12850, rank: 2 },
        { name: 'Emily Davis', referralCode: 'emily2025', totalDonations: 11200, rank: 3 },
        { name: 'Alex Rodriguez', referralCode: 'alex2025', totalDonations: 9850, rank: 4 },
        { name: 'Jessica Kim', referralCode: 'jessica2025', totalDonations: 8750, rank: 5 },
        { name: 'David Wilson', referralCode: 'david2025', totalDonations: 7650, rank: 6 },
        { name: 'Lisa Thompson', referralCode: 'lisa2025', totalDonations: 6540, rank: 7 },
        { name: 'Ryan Brown', referralCode: 'ryan2025', totalDonations: 5430, rank: 8 },
        { name: 'Amanda Lee', referralCode: 'amanda2025', totalDonations: 4320, rank: 9 },
        { name: 'Chris Martinez', referralCode: 'chris2025', totalDonations: 3210, rank: 10 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  if (loading) {
    return (
      <div className="text-center" style={{ marginTop: '100px' }}>
        <h2>Loading leaderboard...</h2>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-center mb-4">Top Performers Leaderboard</h1>
      
      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>🏆 Current Rankings</h2>
          <button onClick={fetchLeaderboard} className="btn btn-secondary">
            Refresh
          </button>
        </div>

        <div style={{ background: '#f8f9fa', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
          <h3 style={{ color: '#667eea', marginBottom: '10px' }}>🏅 Top 3 Prizes</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ textAlign: 'center', padding: '16px', background: '#fff3cd', borderRadius: '8px', border: '2px solid #ffc107' }}>
              <h4>🥇 1st Place</h4>
              <p>Premium Badge + $500 Bonus</p>
            </div>
            <div style={{ textAlign: 'center', padding: '16px', background: '#f8f9fa', borderRadius: '8px', border: '2px solid #6c757d' }}>
              <h4>🥈 2nd Place</h4>
              <p>Gold Badge + $300 Bonus</p>
            </div>
            <div style={{ textAlign: 'center', padding: '16px', background: '#fff3cd', borderRadius: '8px', border: '2px solid #cd7f32' }}>
              <h4>🥉 3rd Place</h4>
              <p>Silver Badge + $200 Bonus</p>
            </div>
          </div>
        </div>

        <div>
          {leaderboard.map((entry, index) => (
            <div key={index} className="leaderboard-item">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span className="rank" style={{ fontSize: '1.5rem' }}>
                  {getRankIcon(entry.rank)}
                </span>
                <div>
                  <h4 style={{ margin: '0', color: '#495057' }}>{entry.name}</h4>
                  <p style={{ margin: '0', fontSize: '14px', color: '#6c757d' }}>
                    Code: {entry.referralCode}
                  </p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h4 style={{ margin: '0', color: '#667eea' }}>
                  ${entry.totalDonations.toLocaleString()}
                </h4>
                <p style={{ margin: '0', fontSize: '14px', color: '#6c757d' }}>
                  Total Raised
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '32px', padding: '20px', background: '#e7f3ff', borderRadius: '8px' }}>
          <h3 style={{ color: '#0056b3', marginBottom: '16px' }}>💡 How to climb the leaderboard:</h3>
          <ul style={{ margin: '0', paddingLeft: '20px', color: '#495057' }}>
            <li>Share your referral code with friends and family</li>
            <li>Organize fundraising events in your community</li>
            <li>Use social media to spread awareness</li>
            <li>Partner with local businesses for matching donations</li>
            <li>Set up recurring donation campaigns</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard; 