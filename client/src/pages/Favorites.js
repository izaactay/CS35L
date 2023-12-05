import * as React from 'react';
import {Typography, Grid, Container } from '@mui/material';
import ItemDisplayCards from '../components/ItemDisplayCards';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Favourites = () => {
  

  

  return (
    <div>
        {/* Display Items Section */}
        <Container sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Favorites
        </Typography>
        <ItemDisplayCards type={"favourites"}/>
      </Container>
    </div>

    
  );
};

export default Favourites;
