require('dotenv').config();
const express = require('express');
const passport = require('passport');
const path = require('path');
const connectToMongoDB = require('./config/db');
const connectToPassport = require('./config/passport');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(passport.initialize());
connectToPassport(passport);

app.use('/api/users', require('./routes/users'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    return res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Connected to server on port ${port}`));
connectToMongoDB();