import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import logo from "../images/grocery_logo.png";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3, 
        px: 2, 
        backgroundColor: "#708238", 
        color: 'white',
      }}
    >
      <Container maxWidth="lg">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start', 
              }}
            >
              <img src={logo} alt="Grocery+" style={{ width: '150px' }} />
              <Typography variant="body2" sx={{ mt: 1, fontFamily: 'Raleway, sans-serif' }}>
                404 Westwood Plaza Suite 277<br />
                Los Angeles, CA 90095
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Typography variant="h6" component={Link} to="/login" sx={{ textDecoration: 'none', color: 'white' }}>
              Account
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
