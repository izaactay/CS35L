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

const verifyUser = async (authHeader) => {
  // Check if user exists in the user table
  const { data: userData, error: userError } = await supabase.auth.getUser(authHeader);

  if (userError || !userData) {
    return {
      status: 404,
      error: 'User not found: '.concat(userError)
    };
  };

  // Check if user 'aud' is 'authenticated'
  if (userData.user.aud !== 'authenticated') {
    return {
      status: 401,
      error: 'User is not authenticated'
    };
  };
  return 0;
};

module.exports = { supabase, verifyUser };