// app.js
require('dotenv').config();
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Initialize Passport
app.use(passport.initialize());
require('./passport'); // Load Passport strategies

// Routes

// Home Route
app.get('/', (req, res) => {
  res.send('Welcome to the JWT Authentication Example!');
});

// Initiate Google OAuth
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }) // Correctly specifying scope
);

// Handle OAuth callback and issue JWT
app.get('/auth/google/redirect', 
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    // Successful authentication
    res.json({ token: req.user.token, user: req.user.user });
  }
);

// Protected Route Example
app.get('/protected', 
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    res.json({ message: 'You have accessed a protected route!', user: req.user });
  }
);

// Login Failure Route
app.get('/login', (req, res) => {
  res.status(401).json({ message: 'Authentication failed' });
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
