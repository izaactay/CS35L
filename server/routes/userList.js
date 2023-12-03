const express = require('express');
const router = express.Router();

// middleware

router.get('/', (req, res) => {
    res.status(200).json({
        data: 'get shopping cart'
    });
});

router.post('/', (req, res) => {
    res.status(200).json({
        data: 'post shopping cart'
    });
});

module.exports = router;