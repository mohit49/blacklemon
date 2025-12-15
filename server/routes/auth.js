import express from 'express';
import jwt from 'jsonwebtoken';
import process from 'process';
import passport from 'passport';
import validator from 'validator'; // Install this package using: npm install validator
import crypto from 'crypto';
import mongoose from 'mongoose';


import User from '../models/user.js';

const router = express.Router();

const sendConfirmationEmail = async (email, token) => {
  const url = 'https://api.brevo.com/v3/smtp/email';
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'api-key': process.env.BREVO_API_KEY, // Use environment variable for security
    },
    body: JSON.stringify({
      sender: { name: 'Darkpulse', email: 'nakamuradev001@gmail.com' },
      replyTo: { email: 'nakamuradev001@gmail.com', name: 'Darkpulse' },
      to: [{ name: email.split('@')[0], email: email }], // Derive name from email if none provided
      textContent: 'Confirm Your Email',
      htmlContent: `
        <h1>Welcome to Our App</h1>
        <p>Please confirm your email by clicking the link below:</p>
        <a href="http://localhost:3300/confirm?token=${token}">Confirm Email</a>
      `,
      subject: 'Verify Your Email',
    }),
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error('Error sending email:', errorDetails);
      throw new Error('Failed to send confirmation email');
    }

    console.log('Email sent successfully!');
  } catch (err) {
    console.error('Error:', err.message);
    throw err; // Propagate the error for handling
  }
};

// Local Signup

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Validate inputs
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' });
  }

  try {
    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      console.error('MongoDB not connected. Connection state:', mongoose.connection.readyState);
      return res.status(500).json({ error: 'Database connection error. Please try again later.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use.' });
    }

    // Generate a unique confirmation token
    const confirmationToken = crypto.randomBytes(20).toString('hex');

    // Create a new user with the confirmation token
    const user = new User({
      name,
      email,
      password,
      confirmationToken,
    });

    // Auto-verify user (email confirmation disabled)
    user.isVerified = true;
    user.confirmationToken = null;
    await user.save();

    // Send confirmation email (disabled)
    // await sendConfirmationEmail(email, confirmationToken);

    res.status(201).json({ message: 'User registered successfully. You can now login.' });
  } catch (error) {
    console.error('Signup error:', error);
    // Provide more specific error messages
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email is already in use.' });
    }
    if (error.message) {
      console.error('Error details:', error.message);
    }
    res.status(500).json({ error: 'Internal Server Error', details: process.env.NODE_ENV === 'development' ? error.message : undefined });
  }
});



// Local Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  
  // Get JWT_SECRET with fallback
  const jwtSecret = process.env.JWT_SECRET || 'darkpulse-secret-key-2025-production-change-this';
  
  if (!jwtSecret) {
    console.error('JWT_SECRET is not set in environment variables');
    return res.status(500).json({ error: 'Server configuration error. Please contact administrator.' });
  }
  
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Google Login (temporarily disabled)
router.get('/google', (_req, res) => {
  res.status(501).json({ error: 'Google authentication is currently disabled.' });
});

router.get('/google/callback', (_req, res) => {
  res.status(501).json({ error: 'Google authentication is currently disabled.' });
});

router.get('/confirm', async (req, res) => {
  const { token } = req.query;

  try {
    // Find user by confirmation token
    const user = await User.findOne({ confirmationToken: token });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired confirmation token.' });
    }

    // Verify the user
    user.isVerified = true;
    user.confirmationToken = null; // Clear the token
    await user.save();

    // Redirect to the login page
    res.redirect('http://localhost:3300/login');
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
