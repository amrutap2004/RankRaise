# RankRaise - MERN Stack Application

A full-stack fundraising dashboard built with the MERN stack (MongoDB, Express.js, React, Node.js) that allows users to track their donations, view rewards, and compete on a leaderboard with interactive features.

## 🚀 Features

### Frontend (React)
- **Modern UI/UX** with responsive design and beautiful gradients
- **Interactive Features** with animated elements and clickable hotspots
- **Authentication System** with login/register functionality
- **Dashboard** showing:
  - User name and personal info
  - Unique referral code (format: yourname2025)
  - Total donations raised with real-time updates
  - Rewards and unlockables section
  - Quick stats and rankings
  - Interactive progress visualizations
- **Leaderboard Page** with:
  - Top performers ranking
  - Prize information
  - Tips for climbing the leaderboard
- **Navigation** with protected routes

### Backend (Node.js + Express)
- **RESTful API** with MongoDB integration
- **User Management** with registration and login
- **Dashboard Data** retrieval and updates
- **Leaderboard System** with rankings
- **Donation Tracking** with real-time updates
- **MongoDB Integration** for data persistence

## 🛠️ Tech Stack

- **Frontend**: React.js, React Router, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Styling**: Custom CSS with modern design
- **Authentication**: JWT-based (ready for production)

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Step 1: Clone and Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### Step 2: Database Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Create a database named `rankraise`
3. Update the `.env` file with your MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/rankraise
PORT=5000
NODE_ENV=development
```

### Step 3: Run the Application

#### Development Mode (Recommended)
```bash
# Run both frontend and backend concurrently
npm run dev
```

#### Separate Mode
```bash
# Terminal 1: Run backend
npm run server

# Terminal 2: Run frontend
npm run client
```

### Step 4: Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🎯 Demo Credentials

For testing purposes, you can use these demo credentials:
- **Email**: demo@intern.com
- **Password**: password123

Or register a new account with any email/password combination.

## 📋 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - Login user

### Dashboard
- `GET /api/dashboard/:email` - Get user dashboard data
- `PUT /api/donations/:email` - Update donation amount

### Leaderboard
- `GET /api/leaderboard` - Get top performers

## 🎨 Features Overview

### Dashboard Features
1. **Personal Information Display**
   - Intern name prominently displayed
   - Unique referral code (auto-generated)
   - Total donations with currency formatting

2. **Donation Management**
   - Add new donations with form validation
   - Real-time updates to total amount
   - Success/error messaging

3. **Rewards System**
   - Visual display of unlocked rewards
   - Locked rewards with unlock requirements
   - Badge system (Bronze, Silver, Gold, Platinum, Diamond)

4. **Quick Stats**
   - Current ranking
   - Days active
   - Number of referrals

### Leaderboard Features
1. **Top Performers**
   - Ranked list with medals for top 3
   - Total donations display
   - Referral codes shown

2. **Prize Information**
   - Visual display of prizes for top 3
   - Bonus amounts and badges

3. **Motivation Tips**
   - Strategies to climb the leaderboard
   - Best practices for fundraising

## 🔧 Customization

### Adding New Features
1. **New Rewards**: Update the rewards array in the User schema
2. **Additional Stats**: Modify the dashboard component
3. **New API Endpoints**: Add routes in `server.js`

### Styling
- All styles are in `client/src/index.css`
- Uses CSS Grid and Flexbox for responsive design
- Gradient backgrounds and modern card designs

## 🚀 Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in environment variables
2. Update MongoDB connection string for production
3. Deploy to platforms like Heroku, Railway, or DigitalOcean

### Frontend Deployment
1. Build the React app: `npm run build`
2. Deploy the `build` folder to platforms like Netlify, Vercel, or GitHub Pages

## 📝 Project Structure

```
intern-dashboard/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json
├── server.js              # Express server
├── package.json           # Backend dependencies
└── README.md
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check that MongoDB is running
2. Verify all dependencies are installed
3. Check the console for error messages
4. Ensure ports 3000 and 5000 are available

---

**Happy Coding! 🎉** 