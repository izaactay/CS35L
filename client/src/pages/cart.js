import * as React from 'react';
import { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, TextField, Grid, Card, CardContent, CardMedia, Container } from '@mui/material';
import ItemDisplayCards from '../components/ItemDisplayCards';

const Cart= () => {
  return (
    <div>
        {/* Display Items Section */}
        <Container sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Cart
        </Typography>
        <ItemDisplayCards type={"cart"}/>
      </Container>
    </div>

    
  );
};

export default Cart;
