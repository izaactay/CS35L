import * as React from 'react';
import {Typography, Box, Container } from '@mui/material';
import ItemDisplayCards from '../components/ItemDisplayCards';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Favourites = () => {
  

  

  return (
    <Box>
        {/* Display Items Section */}
        <Container sx={{ marginTop: 4 }}>
        <Typography 
          sx={{fontFamily: 'Raleway, sans-serif', fontSize: '30px'}}
        >
          Your Favorites
        </Typography>
        <ItemDisplayCards type={"favourites"}/>
      </Container>
    </Box>

    
  );
};

export default Favourites;
