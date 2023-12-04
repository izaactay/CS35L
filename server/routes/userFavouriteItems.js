const express = require('express');
const router = express.Router();
const { authenticate } = require('../modules/token');
const { verifyUser, getUserList, supabase } = require('../modules/supabaseServer');

// middleware
router.use(authenticate);
router.use(verifyUser);

router.get('/', async (req, res) => {
  try {
    // Get foreignkey list
    const data = await getUserList('UserFavouriteItems', req.user);

    // Resolve each item in list to its entry in database
    const mapped = await Promise.all(data.map(async (data) => {
      const { data: itemData } = await supabase
        .from('Items').select()
        .eq('id', data.item_id);
      return itemData[0];
    }));

    res.status(200).json(mapped);

  } catch (error) {
    console.error(error);
    res.status(500).json('Internal Server Error');
  };
});

router.post('/', (req, res) => {
  res.status(200).json({
    data: 'post favs'
  });
});

module.exports = router;