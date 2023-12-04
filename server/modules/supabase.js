// supabaseServer.js
// require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Create a single supabase client for interacting with your database
const client = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
);

// User verification middleware
const verifyUser = async (req, res, next) => {
  try {

    // Check if user exists in the user table
    const { data: userData, error: userError } = await client
      .auth.getUser(req.header('Authorization').split(' ').pop());

    if (userError || !userData) {
      return res.status(404).json({
        error: 'User not found: '.concat(userError)
      });
    };

    // Check if user 'aud' is 'authenticated'
    if (userData.user.aud !== 'authenticated') {
      return res.status(401).json({
        error: 'User is not authenticated'
      })
    };

    next();

  } catch (error) {

    console.error('Error:', error);

    res.status(500).json({
      error: 'Internal Server Error'
    });

  };
};

// Get data from table
const getUserList = async (table, userID) => {
  const { data, error } = await client
    .from(table)
    .select()
    .eq('user_id', userID);

  if (error) {
    throw error;
  } else {
    return data;
  };
};

// Get items from database
const toItems = async (data) => {
  return await Promise.all(data.map(async (data) => {
    const { data: itemData } = await client
      .from('Items')
      .select('id, name, shop, curr_price, price_type, img, query')
      .eq('id', data.item_id);
    return itemData[0];
  }));
};

// Attempt insert relation to table
const insertRelation = async (table, itemID, userID) => {
  let { data, error } = await client
    .from('Items')
    .select()
    .eq('id', itemID);
  if (data.length === 0) {
    // item does not exist
  };
  ({ data, error } = await client
    .from(table)
    .select()
    .eq('user_id', userID)
    .eq('item_id', itemID));
  if (data.length === 0) {
    // relation does not exist
    ({ data, error } = await client
      .from(table)
      .insert({
        item_id: itemID,
        user_id: userID
      }));
    return data;
  }
  
};

// Attempt remove relation from table
const removeRelation = async (table, itemID, userID) => {
  let { error } = await client
    .from(table)
    .delete()
    .eq('user_id', userID)
    .eq('item_id', itemID);
};

module.exports = { client, verifyUser, getUserList, toItems, insertRelation, removeRelation };