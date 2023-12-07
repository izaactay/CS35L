import React, { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import client from '../modules/supabase';

const UpdateAuth = (props) => {

    useEffect(() => {
        
        const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
            props.setSession(session);
      
            // Store the access token locally when the session is available
            if (session) {
              localStorage.setItem('supabaseToken', session.access_token);
            }
          });
      
             
    }, []);
    



};

export default UpdateAuth;