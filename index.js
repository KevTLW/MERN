require('dotenv').config();
const express = require('express');
const passport = require('passport');
const connectToMongoDB = require('./config/db');
const connectToPassport = require('./config/passport');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(passport.initialize());
connectToPassport(passport);

app.listen(port, () => console.log(`Connected to server on port ${port}`));
connectToMongoDB();