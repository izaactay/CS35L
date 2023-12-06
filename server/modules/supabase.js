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
    console.error(error);
    res.status(500).json();
  };
};

// Get data from table
const getUserList = async (table, userID) => {
  // Find every relation in the table pertaining to the user
  const { data, error } = await client
    .from(table)
    .select()
    .eq('user_id', userID);

  if (error) throw ({
    code: 500,
    error
  });
  return data;
};


// Try to find an item in items table
const findItem = async (itemID) => {
  const { data, error } = await client
    .from('Items')
    .select('id, name, shop, curr_price, price_type, img, query')
    .eq('id', itemID);

  if (error) throw ({
    code: 500,
    error
  });
  return data[0]; // returns undefined if does not exist
};


// Get items from database, for UserFavouriteItems
const toItemsFavs = async (data) => {
  // Map each itemID in the data array to its corresponding item in the database
  const promises = data.map(async data => await findItem(data.item_id));
  // Wait for every single item to resolve (some might be undefined) before returning
  return await Promise.all(promises);
};


// Get items from database, but for UserList
const toItemsCart = async (data) => {
  const promises = data.map(async data => {
    const item = await findItem(data.item_id);
    return {
      item,
      qty: data.qty
    }
  });
  return await Promise.all(promises);
};

// Try to find a relation in the table
const findRelation = async (table, itemID, userID) => {
  const { data, error } = await client
    .from(table)
    .select()
    .eq('user_id', userID)
    .eq('item_id', itemID);

  if (error) throw ({
    code: 500,
    error
  });
  return data[0]; 
};


// Attempt insert relation to table (DEFAULT QTY)
const insertRelation = async (table, itemID, userID) => {
  if (await findRelation(table, itemID, userID) !== undefined) {
    return;
  } 
  // relation does not exist
  // Try to find item in items
  if (await findItem(itemID) === undefined) {
    // item not found
    throw ({ 
      code: 404,
      error: 'Item not found',
      response: {
        Error: 'Item not found' 
      }
    });
  };

  const { data, error } = await client
    .from(table)
    .insert({
      item_id: itemID,
      user_id: userID,
    });

  if (error) throw ({
    code: 500,
    error
  });
  return data;
};

// Attempt remove relation from table
const removeRelation = async (table, itemID, userID) => {
  const { error } = await client
    .from(table)
    .delete()
    .eq('user_id', userID)
    .eq('item_id', itemID);

  if (error) throw ({
    code: 500,
    error
  });
};

// Update item qty in cart for a single item
const updateCartQty = async (itemID, userID, qty) => {
  // If qty is 0 we want to remove the relation
  if (qty === 0 || qty === '0') {
    return await removeRelation('UserList', itemID, userID);
  };

  // Try to insert relation into list
  await insertRelation('UserList', itemID, userID);

  // Then update the qty
  const { data, error } = await client
    .from('UserList')
    .update({ qty: qty })
    .eq('user_id', userID)
    .eq('item_id', itemID);

  if (error) throw ({
    code: 500,
    error
  });
  return data;
};

module.exports = { 
  client, 
  verifyUser, 
  getUserList, 
  toItemsFavs, 
  toItemsCart,
  insertRelation, 
  removeRelation, 
  updateCartQty 
};