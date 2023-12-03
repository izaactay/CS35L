const express = require('express');
const router = express.Router();

// middleware

router.get('/', (req, res) => {
    res.status(200).json({
        data: 'get items'
    });
});

router.post('/', (req, res) => {
    res.status(200).json({
        data: 'post items'
    });
});

module.exports = router;