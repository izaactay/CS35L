import React, { useState, useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { Button } from '@mui/material';
import { Typography, Container, Box } from '@mui/material';
import * as Icons from '@mui/icons-material/';
import { Link } from 'react-router-dom';
import backgroundPhoto from '../images/background.jpg';




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
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 1,
        height: '100vh',
        backgroundImage: `url(${backgroundPhoto})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>

        <Typography
          sx={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '50px', color: 'white', fontWeight: 'bold' }}
        >Hello {props.session.user.user_metadata.full_name}, Welcome Back!</Typography>
        <Container sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

          <Button
            sx={{ fontFamily: 'Raleway, sans-serif', fontSize: '18px', backgroundColor: 'white', color: '#708238', borderRadius: '28', mt: 2, width: '275px' }}
            component={Link}
            to="/favorites"
            startIcon={<Icons.Favorite />}
          >
            View Your Favorites
          </Button>

          <Button
            sx={{ fontFamily: 'Raleway, sans-serif', fontSize: '18px', backgroundColor: 'white', color: '#708238', mt: 2, width: '275px' }}
            variant='outlined'
            component={Link}
            to="/cart"
            startIcon={<Icons.ShoppingCart />}
          >
            View Your Cart
          </Button>

          <Button
            block onClick={() => {
              localStorage.removeItem('supabaseToken');
              localStorage.removeItem('userFavorites');
              localStorage.removeItem('userCart');
              props.supabase.auth.signOut()
            }}
            sx={{ fontFamily: 'Raleway, sans-serif', fontSize: '18px',backgroundColor: 'white', color: '#708238', mt: 2, mb: 10, width: '275px' }}
            variant='outlined'
            startIcon={<Icons.Logout />}
          >
            Sign Out
          </Button>
        </Container>
      </Box>

    );
  } else {
    return (
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(${backgroundPhoto})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>

        <Typography
          sx={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '50px', color: 'white', fontWeight: 'bold' }}
        >Hungry For Deals? Sign In to Discover More!</Typography>
        {error && <p className="error-message">Login failed. Please try again.</p>}

        <Button sx={{ marginTop: 4, backgroundColor: 'white', color: '#708238', fontSize: '18px',
        fontFamily: 'RaleWay, sans-serif', height: '45px', width: '275px',
        '&:hover': {
          color: 'white'
      }}}>
          <Auth
            onlyThirdPartyProviders={true}
            supabaseClient={props.supabase}
            appearance={{ 
              style: {
                button: {border: 'transparent'}
              }
             }}
            providers={['google']}
            view="sign_up"
          />
        </Button>
        </Box>
        );
  }
  
  
}

export default LoginBox;

