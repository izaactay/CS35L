import React, { useState,  useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from '@supabase/auth-ui-shared';
import "./Signup.css";

function Signup(props) {
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
		<div className="signup-form">
            <h2>Signup</h2>
            <Auth
            supabaseClient={props.supabase}
            appearance={{ theme: ThemeSupa }}
            view="sign_up"
            />
		</div>
	);
}
export default Signup;