const express = require('express');
const router = express.Router();

// middleware

router.get('/', (req, res) => {
  res.status(200).json({
    data: 'get favs'
  });
});

router.post('/', (req, res) => {
  res.status(200).json({
    data: 'post favs'
  });
});

module.exports = router;