import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import process from 'process';
import authRoutes from './routes/auth.js';
import mainRoutes from './routes/main.js'
// import './config/googleAuth.js'; // Google OAuth config (temporarily disabled)

dotenv.config();

// Verify critical environment variables
if (!process.env.JWT_SECRET) {
  console.error('WARNING: JWT_SECRET is not set in environment variables!');
  console.error('JWT_SECRET from env:', process.env.JWT_SECRET);
}

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({ secret: 'darkpulse', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
// app.use('/add-account', accountRoutes)
app.use('/api', mainRoutes)

// MongoDB Connection
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('MongoDB URI not found in environment variables');
} else {
  mongoose.connect(mongoUri, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  })
    .then(() => {
      console.log('Connected to MongoDB');
      console.log('Database:', mongoose.connection.db.databaseName);
    })
    .catch(err => {
      console.error('Error connecting to MongoDB:', err.message);
      // Don't exit process, but log the error
    });
}

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
