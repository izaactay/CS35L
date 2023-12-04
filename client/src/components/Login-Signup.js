// import React, { useState, useEffect } from "react";
// import { Auth } from "@supabase/auth-ui-react";
// import { ThemeSupa } from '@supabase/auth-ui-shared';
// import "./Login-Signup.css";

// function Login(props) {

//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       const { data: { session } } = await props.supabase.auth.getSession();
//       // console.log(session)
//       props.setSession(session);

//       // Store the access token locally when the session is available
//       if (session) {
//         localStorage.setItem('supabaseToken', session.access_token);
//       }
//     };

//     fetchData();

//     const { data: { subscription } } = props.supabase.auth.onAuthStateChange((_event, session) => {
//       props.setSession(session);

//       // Store the access token locally when the session is available
//       if (session) {
//         localStorage.setItem('supabaseToken', session.access_token);
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   return (
//     <div className="login-container">
//       <h2>Welcome Back!</h2>
//       {error && <p className="error-message">Login failed. Please try again.</p>}

//       <div className="alternative-signup">
//         <Auth
//           supabaseClient={props.supabase}
//           appearance={{ theme: ThemeSupa }}
//           providers={['google', 'github', 'facebook']}
//           view="sign_up"
//         />
//       </div>
//     </div>
//   );
// }

// export default Login;

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Grocery+
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}