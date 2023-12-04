import * as React from 'react';
import { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, TextField, Grid, Card, CardContent, CardMedia, Container } from '@mui/material';
import GroceryItem from '../components/GroceryItem'

const Cart= () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    
    const fetchedItems = [
        { id: 1, name: 'Apple', price: '$1.00', store: 'Store A', imageUrl: 'https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=1024x1024&w=is&k=20&c=d1zu5oXbrdTrk2AtTyUtvnWLF7ZeIbTgqSXabU4ABi4=' },
        { id: 2, name: 'Banana', price: '$0.50', store: 'Store B', imageUrl: 'https://media.istockphoto.com/id/162487071/photo/banana-bunch.jpg?s=1024x1024&w=is&k=20&c=hUqk05fjkCBeKSPqIluYj_QWhx9kMRUeAIXRJAzUnOQ=' },
    ];
    setItems(fetchedItems);
  }, []);

  return (
    <div>
        {/* Display Items Section */}
        <Container sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Shopping Cart
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

export default Cart;
