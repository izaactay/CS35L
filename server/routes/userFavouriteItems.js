const express = require('express');
const router = express.Router();
const { authenticate } = require('../modules/token');
const sb = require('../modules/supabase');
const { isPosInt } = require('../modules/helpers');

// middleware
router.use(authenticate);
router.use(sb.verifyUser);


const respondData = async (req, res) => {
  // Get foreignkey list
  const data = await sb.getUserList('UserFavouriteItems', req.user);

  // Resolve each item in list to its entry in database
  const mapped = await sb.toItemsFavs(data);
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


router.put('/add', async (req, res) => {
  try {
    for (const itemID of req.body) {
      if (!isPosInt(itemID)) {
        return res.status(400).json({
          Error: 'Invalid item IDs'
        });
      };
      await sb.insertRelation('UserFavouriteItems', itemID, req.user);
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
      if (!isPosInt(itemID)) {
        return res.status(400).json({
          Error: 'Invalid item IDs'
        });
      };
      await sb.removeRelation('UserFavouriteItems', itemID, req.user);
    };
    await respondData(req, res);

  } catch ({ code, error, response }) {
    console.error(error);
    res.status(code).json(response);
  };
});


module.exports = router;