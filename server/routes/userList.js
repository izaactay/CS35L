const express = require('express');
const router = express.Router();
const { authenticate } = require('../modules/token');
const sb = require('../modules/supabase');
const { getItemIDsFromBody } = require('../modules/helpers');

// middleware
router.use(authenticate);
router.use(sb.verifyUser);

const respondData = async (req, res) => {
  try {
    // Get foreignkey list
    const data = await sb.getUserList('UserList', req.user);

    // Resolve each item in list to its entry in database
    const mapped = await sb.toItemsCart(data);
    res.status(200).json(mapped);

  } catch (error) {
    console.error(error);
    res.status(500).json();
  };
};

router.get('/', (req, res) => {
  respondData(req, res); 
  // Hmm, i guess it doesn't matter if this function returns before respondData
});

router.post('/', async (req, res) => {
  for (const { id: itemID, qty } of req.body) {
    await sb.updateCartQty(itemID, req.user, qty);
  };
  await respondData(req, res);
});

router.put('/add', async (req, res) => {
  const ids = getItemIDsFromBody(req.body);
  for (const id of ids) {
    await sb.insertRelation('UserList', id, req.user);
  };
  await respondData(req, res);
});

router.put('/remove', async (req, res) => {
  const ids = getItemIDsFromBody(req.body);
  for (const id of ids) {
    await sb.removeRelation('UserList', id, req.user);
  };
  await respondData(req, res);
});

module.exports = router;