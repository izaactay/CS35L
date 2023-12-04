import React from 'react';
import {Grid, Card, CardContent, CardMedia, Typography, IconButton} from '@mui/material';
import { Favorite } from '@mui/icons-material';
import { Delete } from '@mui/icons-material';

const GroceryItem = ({ item }) => (
    <Grid item xs={12} sm={4} md={3}>
      <Card>
        <CardMedia
          component="img"
          height="140"
          image={item.imageUrl}
          alt={item.name}
        />
        <CardContent>
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="body1">Price: {item.price}</Typography>
          <Typography variant="body2">Store: {item.store}</Typography>
          <IconButton color="black"><Favorite /></IconButton>
          <IconButton color="black"><Delete /></IconButton>
        </CardContent>
      </Card>
    </Grid>
  );

export default GroceryItem;