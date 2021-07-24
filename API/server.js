const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

// const authRoutes = require('./routes/auth');
const habitsRoutes = require('./routes/habits');
const usersRoutes = require('./routes/users');

// server.use('/auth', authRoutes);
server.use('/habits', habitsRoutes);
server.use('/users', usersRoutes)

server.get('/', (req, res) => res.send('Welcome to team brogrammers'));

module.exports = server;