const express = require('express');
const connectDB = require('./config/db');

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

app.get('/', (req, res) => {
  res.send('API running');
});

// Define routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/profile', profile);
app.use('/api/posts', posts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
