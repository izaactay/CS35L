const express = require('express');
const router = express.Router();
const { authenticate } = require('../modules/token');
const sb = require('../modules/supabase');
const { isPosInt } = require('../modules/helpers')

// middleware
router.use(authenticate);
router.use(sb.verifyUser);


const respondData = async (req, res) => {
  // Get foreignkey list
  const data = await sb.getUserList('UserList', req.user);

  // Resolve each item in list to its entry in database
  const mapped = await sb.toItemsCart(data);
  res.status(200).json(mapped);
};


router.get('/', async (req, res) => {
  try {
    await respondData(req, res);

  } catch ({ code, error, response }) {
    console.error(error);
    res.status(code).json(response);
  };
});


router.post('/', async (req, res) => {
  try {
    for (const { id: itemID, qty } of req.body) {
      if (!isPosInt(itemID) || !isPosInt(qty)) {
        return res.status(400).json({
          Error: 'Invalid item IDs or qty values'
        });
      };
      await sb.updateCartQty(itemID, req.user, qty);
    };
    await respondData(req, res);

  } catch ({ code, error, response }) {
    console.error(error);
    res.status(code).json(response);
  };
});


router.put('/add', async (req, res) => {
  try {
    for (const itemID of req.body) {
      if (isPosInt(itemID) === false) {
        return res.status(400).json({
          Error: 'Invalid item IDs'
        });
      };
      await sb.insertRelation('UserList', itemID, req.user);
    };
    await respondData(req, res);

  } catch ({ code, error, response }) {
    console.error(error);
    res.status(code).json(response);
  };
});


router.put('/remove', async (req, res) => {
  try {
    for (const itemID of req.body) {
      if (isPosInt(itemID) === false) {
        return res.status(400).json({
          Error: 'Invalid item IDs'
        });
      };
      await sb.removeRelation('UserList', itemID, req.user);
    };
    await respondData(req, res);

  } catch ({ code, error, response }) {
    console.error(error);
    res.status(code).json(response);
  };
});


module.exports = router;