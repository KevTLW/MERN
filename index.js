require('dotenv').config();
const express = require('express');
const connectToMongoDB = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Connected to server on port ${port}`));
connectToMongoDB();