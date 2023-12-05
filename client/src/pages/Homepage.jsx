import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Container } from '@mui/material';
import backgroundPhoto from '../images/background.jpg';


import GroceryItem from '../components/GroceryItem'

const HomePage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    
    const fetchedItems = [
        { id: 1, name: 'Apple', price: '$1.00', store: 'Store A', imageUrl: 'https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=1024x1024&w=is&k=20&c=d1zu5oXbrdTrk2AtTyUtvnWLF7ZeIbTgqSXabU4ABi4=' },
        { id: 2, name: 'Banana', price: '$0.50', store: 'Store B', imageUrl: 'https://media.istockphoto.com/id/162487071/photo/banana-bunch.jpg?s=1024x1024&w=is&k=20&c=hUqk05fjkCBeKSPqIluYj_QWhx9kMRUeAIXRJAzUnOQ=' },
        { id: 2, name: 'Banana', price: '$0.50', store: 'Store B', imageUrl: 'https://media.istockphoto.com/id/162487071/photo/banana-bunch.jpg?s=1024x1024&w=is&k=20&c=hUqk05fjkCBeKSPqIluYj_QWhx9kMRUeAIXRJAzUnOQ=' },
        { id: 2, name: 'Banana', price: '$0.50', store: 'Store B', imageUrl: 'https://media.istockphoto.com/id/162487071/photo/banana-bunch.jpg?s=1024x1024&w=is&k=20&c=hUqk05fjkCBeKSPqIluYj_QWhx9kMRUeAIXRJAzUnOQ=' },
    ];
    setItems(fetchedItems);
  }, []);

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
        <Grid sx={{ marginTop: 4 }} container spacing={3}>
          {items.map(item => (
            <GroceryItem key={item.id} item={item} />
          ))}
        </Grid>
      </Container>
    </div>

    
  );
};

export default HomePage;
