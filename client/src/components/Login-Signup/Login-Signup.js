import React, { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from '@supabase/auth-ui-shared';
import "./Login-Signup.css";

function Login(props) {

  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: { session } } = await props.supabase.auth.getSession();
      // console.log(session)
      props.setSession(session);

      // Store the access token locally when the session is available
      if (session) {
        localStorage.setItem('supabaseToken', session.access_token);
      }
    };

    fetchData();

    const { data: { subscription } } = props.supabase.auth.onAuthStateChange((_event, session) => {
      props.setSession(session);

      // Store the access token locally when the session is available
      if (session) {
        localStorage.setItem('supabaseToken', session.access_token);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="login-container">
      <h2>Welcome Back!</h2>
      {error && <p className="error-message">Login failed. Please try again.</p>}

      <div className="alternative-signup">
        <Auth
          supabaseClient={props.supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'github', 'facebook']}
          view="sign_up"
        />
      </div>
    </div>
  );
}

export default Login;
