import React, { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from '@supabase/auth-ui-shared';


//import "./Login-Signup.css";

function LoginBox(props) {
  
  const [error, setError] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await props.supabase.auth.getSession();
      const { session, user } = data
      props.setSession(session);
      
      // Store the access token locally when the session is available
      if (session) {
        
        localStorage.setItem('supabaseToken', session.access_token);
        localStorage.setItem('UserId', session.user.id)

      }
      
    };

    fetchData();

    const { data: { subscription } } = props.supabase.auth.onAuthStateChange((_event, session) => {
      props.setSession(session);

      // Store the access token locally when the session is available
      if (session) {
        localStorage.setItem('supabaseToken', session.access_token);
        localStorage.setItem('UserId', session.user.id)
        
      }
    });

    return () => subscription.unsubscribe();
  }, []);
  if (props.session) {
    return (
    
      <div className="login-container">
        <h2>Hello {props.session.user.user_metadata.full_name}, Welcome Back!</h2>
        
        
      </div>
    );
  } else {
    return (
    
      <div className="login-container">
        <h2>Hello! Log In!</h2>
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
  
  
}

export default LoginBox;

