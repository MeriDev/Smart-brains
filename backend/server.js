const express = require('express');
// const http = require('http');
const cors = require('cors');

const colors = require('colors');

const detect = require('./detect');
const app = express();

// Enable CORS for all routes
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = process.env.PORT || 5000;

app.post('/detect', (req, res) => detect.handleDetect(req, res));

app.set('port', port);
app.listen(port, () => {
  console.log(`Proxy running on http://localhost:${port}`.rainbow.underline);
});
