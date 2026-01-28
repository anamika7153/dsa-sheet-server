const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? [process.env.FRONTEND_URL, 'https://dsa-sheet-frontend.onrender.com']
    : ['http://localhost:3000'],
  credentials: true
};
app.use(cors(corsOptions));

// Health check endpoint (for Render)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Route files
const authRoutes = require('./routes/auth');
const topicRoutes = require('./routes/topics');
const progressRoutes = require('./routes/progress');

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/progress', progressRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server Error'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
