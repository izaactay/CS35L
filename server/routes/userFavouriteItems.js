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
    const data = await sb.getUserList('UserFavouriteItems', req.user);

    // Resolve each item in list to its entry in database
    const mapped = await sb.toItemsFavs(data);
    res.status(200).json(mapped);

  } catch (error) {
    console.error(error);
    res.status(500).json();
  };
};

router.get('/', async (req, res) => {
  await respondData(req, res);
});


router.put('/add', async (req, res) => {
  try {
    const ids = getItemIDsFromBody(req.body);
    for (const id of ids) {
      await sb.insertRelation('UserFavouriteItems', id, req.user);
    };
    await respondData(req, res);

  } catch (error) {
    console.error(error);
    res.status(500).json();
  };
});


router.put('/remove', async (req, res) => {
  try {
    const ids = getItemIDsFromBody(req.body);
    for (const id of ids) {
      await sb.removeRelation('UserFavouriteItems', id, req.user);
    };
    await respondData(req, res);
    
  } catch (error) {
    console.error(error);
    res.status(500).json();
  };
});


module.exports = router;