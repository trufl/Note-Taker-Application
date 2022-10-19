const router = require('express').Router();
const path = require('path');

// html routes from the server file will be defined here instead of the server.js
// GET Route for homepage
router.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '../../public/index.html'))
);

// GET Route for feedback page
router.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '../../public/notes.html'))
);

module.exports = router;