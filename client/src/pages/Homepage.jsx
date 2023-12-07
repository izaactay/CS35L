import * as React from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import backgroundPhoto from '../images/background.jpg';
import ItemDisplayCards from '../components/ItemDisplayCards';


const HomePage = () => {
  

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: 500, 
          backgroundImage: `url(${backgroundPhoto})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <Typography variant="h4" color="white" sx={{fontFamily: 'Bebas Neue, sans-serif', fontSize: '100px'}}>
          Welcome to Grocery+
        </Typography>
        <Typography variant="subtitle2" color="white" gutterBottom sx={{fontFamily: 'Raleway, sans-serif', fontSize: '25px'}}>
          Shop Smarter, Not Harder: Make informed choices, save money, and time!
        </Typography>
      </Box>

        {/* Display Items Section */}
        <Container sx={{ marginTop: 4 }}>
        <Typography variant="h5" sx={{fontFamily: 'Raleway, sans-serif', fontSize: '25px'}}>
          Browse Items
        </Typography>
          <ItemDisplayCards type={"favourites"}/>
      </Container>
    </div>

    
  );
};

export default HomePage;
