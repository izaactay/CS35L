import React from 'react';
import { Link } from 'react-router-dom';
import {Card, CardContent, CardMedia, Typography, IconButton, Button, } from '@mui/material';
import { FavoriteBorder, Delete, ShoppingCart } from '@mui/icons-material';
import {updateFavorite} from './ItemDisplayCards';


const GroceryItem = ({ item, showAddToCart = false,showFavorite = true, showDelete = false, onAddToCart, onToggleFavorite, onDelete }) => (

    <Button sx={{ width: '25%' }} component={Link} to={`/item/${item.id}`}>
      <Card sx={{ width: '100%', height: '100%' }}>
        <CardMedia
          component="img"
          height="140"
          image={item.img}
          alt={item.name}
        />
        <CardContent>
          <Typography variant="h6">{item.name}</Typography>
          <Typography variant="body1">Price: {item.curr_price}</Typography>
          <Typography variant="body2">Store: {item.shop}</Typography>
          {showFavorite && 
          (<IconButton
            onClick={(event)=>{
              event.preventDefault();
              updateFavorite(item);}}
            >
              <FavoriteBorder />
            </IconButton>)}


          {showDelete && <IconButton color="black"><Delete /></IconButton>}


          {showAddToCart && 
          (<Button 
            sx={{ml: 1}}
            variant="outlined"
            startIcon={<ShoppingCart />}
            //onClick function to be implemented
            >
              Add to Cart
            </Button>
          )}

        </CardContent>
      </Card>
    </Button>
  );

export default GroceryItem;