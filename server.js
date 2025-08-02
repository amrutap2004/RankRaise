const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Demo data for when MongoDB is not available
const demoUsers = [
  {
    name: 'Demo User',
    email: 'demo@intern.com',
    password: 'password123',
    referralCode: 'demo2025',
    totalDonations: 3450,
    rewards: ['Bronze Badge', 'First Donation']
  }
];

const demoLeaderboard = [
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
];

let isMongoConnected = false;

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/intern-dashboard';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB Connected');
  isMongoConnected = true;
})
.catch(err => {
  console.log('MongoDB Connection Error:', err);
  console.log('Running in demo mode with local data');
  isMongoConnected = false;
});

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  referralCode: { type: String, required: true },
  totalDonations: { type: Number, default: 0 },
  rewards: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Leaderboard Schema
const leaderboardSchema = new mongoose.Schema({
  name: { type: String, required: true },
  referralCode: { type: String, required: true },
  totalDonations: { type: Number, default: 0 },
  rank: { type: Number }
});

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

// Routes

// Register User
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const referralCode = `${name.toLowerCase()}2025`;
    
    if (isMongoConnected) {
      const user = new User({
        name,
        email,
        password,
        referralCode,
        totalDonations: Math.floor(Math.random() * 5000) + 1000,
        rewards: ['Bronze Badge', 'First Donation']
      });
      
      await user.save();
      
      const leaderboardEntry = new Leaderboard({
        name,
        referralCode,
        totalDonations: user.totalDonations,
        rank: Math.floor(Math.random() * 10) + 1
      });
      await leaderboardEntry.save();
      
      res.json({ success: true, user: { name, email, referralCode, totalDonations: user.totalDonations } });
    } else {
      // Demo mode
      const newUser = {
        name,
        email,
        referralCode,
        totalDonations: Math.floor(Math.random() * 5000) + 1000,
        rewards: ['Bronze Badge', 'First Donation']
      };
      demoUsers.push(newUser);
      res.json({ success: true, user: newUser });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Login User
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (isMongoConnected) {
      const user = await User.findOne({ email, password });
      
      if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
      
      res.json({ 
        success: true, 
        user: { 
          name: user.name, 
          email: user.email, 
          referralCode: user.referralCode, 
          totalDonations: user.totalDonations,
          rewards: user.rewards
        } 
      });
    } else {
      // Demo mode
      const user = demoUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }
      
      res.json({ 
        success: true, 
        user: { 
          name: user.name, 
          email: user.email, 
          referralCode: user.referralCode, 
          totalDonations: user.totalDonations,
          rewards: user.rewards
        } 
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get Dashboard Data
app.get('/api/dashboard/:email', async (req, res) => {
  try {
    if (isMongoConnected) {
      const user = await User.findOne({ email: req.params.email });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      
      res.json({
        success: true,
        data: {
          name: user.name,
          referralCode: user.referralCode,
          totalDonations: user.totalDonations,
          rewards: user.rewards
        }
      });
    } else {
      // Demo mode
      const user = demoUsers.find(u => u.email === req.params.email);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      
      res.json({
        success: true,
        data: {
          name: user.name,
          referralCode: user.referralCode,
          totalDonations: user.totalDonations,
          rewards: user.rewards
        }
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Get Leaderboard
app.get('/api/leaderboard', async (req, res) => {
  try {
    if (isMongoConnected) {
      const leaderboard = await Leaderboard.find().sort({ totalDonations: -1 }).limit(10);
      res.json({ success: true, leaderboard });
    } else {
      // Demo mode
      res.json({ success: true, leaderboard: demoLeaderboard });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update Donations
app.put('/api/donations/:email', async (req, res) => {
  try {
    const { amount } = req.body;
    
    if (isMongoConnected) {
      const user = await User.findOne({ email: req.params.email });
      
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      
      user.totalDonations += amount;
      await user.save();
      
      await Leaderboard.findOneAndUpdate(
        { referralCode: user.referralCode },
        { totalDonations: user.totalDonations }
      );
      
      res.json({ success: true, totalDonations: user.totalDonations });
    } else {
      // Demo mode
      const user = demoUsers.find(u => u.email === req.params.email);
      
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      
      user.totalDonations += amount;
      res.json({ success: true, totalDonations: user.totalDonations });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`MongoDB Status: ${isMongoConnected ? 'Connected' : 'Demo Mode'}`);
  console.log(`Access the app at: http://localhost:${PORT}`);
}); 