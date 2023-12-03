import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from './supabaseClient';
import LoginSignup from "./components/Login-Signup/Login-Signup";
import WishlistForm from './components/WishlistForm';


export default function App() {
  const [session, setSession] = useState(null);
  return (
    <div className="App">
    <main>
      
      <Routes>
          // User is logged in, show the wishlist form
          <Route path="/wishlist" element={<WishlistForm />} />

          // User is not logged in, show the login route
          <Route path="/login-signup" element={<LoginSignup session={session} setSession={setSession} supabase={supabase}/>} />
      </Routes>
    </main>

  </div>
);
}
