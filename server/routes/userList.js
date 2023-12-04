const express = require('express');
const router = express.Router();
const { authenticate } = require('../modules/token');
const sb = require('../modules/supabase');
const { getItemIDsFromBody } = require('../modules/helpers');

// middleware
router.use(authenticate);
router.use(sb.verifyUser);

router.get('/', async (req, res) => {
  try {
    // Get foreignkey list
    const data = await sb.getUserList('UserList', req.user);

    // Resolve each item in list to its entry in database
    const mapped = await sb.toItems(data);
    res.status(200).json(mapped);

  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  };
});

router.post('/', (req, res) => {
  res.status(200).json({
    data: 'post shopping cart'
  });
});

router.put('/add', async (req, res) => {
  const ids = getItemIDsFromBody(req.body);
  for (const id of ids) {
    await sb.insertRelation('UserList', id, req.user);
  };
  // Get foreignkey list
  const data = await sb.getUserList('UserList', req.user);

  // Resolve each item in list to its entry in database
  const mapped = await sb.toItems(data);
  res.status(200).json(mapped);
});

router.put('/remove', async (req, res) => {
  const ids = getItemIDsFromBody(req.body);
  for (const id of ids) {
    await sb.removeRelation('UserList', id, req.user);
  };
  // Get foreignkey list
  const data = await sb.getUserList('UserList', req.user);

  // Resolve each item in list to its entry in database
  const mapped = await sb.toItems(data);
  res.status(200).json(mapped);
});

module.exports = router;