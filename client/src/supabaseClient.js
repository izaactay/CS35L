 // eslint-disable-next-line
import { REALTIME_CHANNEL_STATES, createClient } from '@supabase/supabase-js'
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;
// Create a single supabase client for interacting with your database
console.log('supabase url is: ',SUPABASE_URL)
export const supabase = createClient(
    SUPABASE_URL, 
    SUPABASE_ANON_KEY,
);