// supabaseServer.js
// require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Create a single supabase client for interacting with your database
const supabase = createClient(
  SUPABASE_URL, 
  SUPABASE_ANON_KEY,
);

// User verification middleware
const verifyUser = async (req, res, next) => {
  try {

    // Check if user exists in the user table
    const { data: userData, error: userError } = await supabase.auth.getUser(req.header('Authorization').split(' ').pop());
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
  const { data, error } = await supabase
    .from(table)
    .select()
    .eq('user_id', userID);

  if (error) {
    throw error;
  } else {
    return data;
  };
}

module.exports = { supabase, verifyUser, getUserList };