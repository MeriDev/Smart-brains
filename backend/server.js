const colors = require('colors');
const express = require('express');
const { ClarifaiStub, grpc } = require('clarifai-nodejs-grpc');
const dotenv = require('dotenv').config();
const cors = require('cors');

const { handleDetect } = require('./detect');

const app = express();

// Enable CORS for all routes
const corsOptions = {
  origin: 'http://localhost:5173', // Update this as needed
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 8000;

app.post('/detect', handleDetect);

app.listen(port, () => {
  console.log(`Proxy running on http://localhost:${port}`.rainbow.underline);
});
