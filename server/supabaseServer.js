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

module.exports = { supabase };