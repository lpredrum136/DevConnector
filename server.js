const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

// Import Routes
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const auth = require('./routes/api/auth');
const posts = require('./routes/api/posts');

const app = express();

// Connect database
connectDB();

// Init middleware
app.use(express.json({ extended: false })); //This is actually body-parser but now it's integrated into express

// Define routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

// Serve static assets if in production
if (process.env.NODE_ENV == 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  // Any request that is not /api/items should load index.html
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
