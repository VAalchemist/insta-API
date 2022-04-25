const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/users.html'));
});

router.get('/thoughts', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/thoughts.html'));
});

router.get('/friends', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/friends.html'));
});

module.exports = router;