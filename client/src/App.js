import React, { useState, useEffect } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from './supabaseClient';
import WishlistForm from './components/WishlistForm';


export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      // console.log(session)
      setSession(session);

      // Store the access token locally when the session is available
      if (session) {
        localStorage.setItem('supabaseToken', session.access_token);
      }
    };

    fetchData();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);

      // Store the access token locally when the session is available
      if (session) {
        localStorage.setItem('supabaseToken', session.access_token);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const [loggedIn, setLoggedIn] = useState(false);
  console.log("Logged in: ", loggedIn);

  return (
    <div>
      {session ? (
        // User is logged in, show the wishlist form
        <WishlistForm />
      ) : (
        // User is not logged in, show the authentication UI
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      )}
    </div>
  );
}
