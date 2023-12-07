import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {Card, CardContent, CardMedia, Typography, IconButton, Button, Grid} from '@mui/material';
import { FavoriteBorder, Favorite, Delete, ShoppingCart } from '@mui/icons-material';
import {updateFavorite, addToCart} from '../modules/apiHelpers';

export function isFavoriteItem(itemID){
  console.log("called is favorite function");
  const favorites = JSON.parse(localStorage.getItem('userFavorites'));
  console.log("user favorite items are ");
  console.log(favorites);
  try{
    if(favorites.some(item => item.id === itemID)){
      return true;
    }
    return false;
   } catch (e) {
     console.error(e);
   }

  
}


const GroceryItem = ({ item, showAddToCart = false,showFavorite = true, showDelete = false}) => {
  const [favorite, setFavorite] = useState(false);
  
  useEffect(() => {
      setFavorite(isFavoriteItem(item.id)); 
  }, []);

  const handleFavClick = (event) => {
    if (localStorage.getItem('supabaseToken')) {
      event.preventDefault();
      updateFavorite(item);
      setFavorite(!favorite);
    } else{
      return (<Navigate to='/login'/>)
    }
    
  }
  
  const handleCartClick = (event) => {
    if (localStorage.getItem('supabaseToken')) {
      event.preventDefault();
      addToCart(item);
    } else{
      return (<Navigate to='/login'/>)
    }
  }

return (
    <Button sx={{ width: '25%' }} component={Link} to={`/item/${item.id}`}>
      <Card sx={{ width: '100%', height: '100%' }}>
        <CardMedia
          component="img"
          height="140"
          image={item.img}
          alt={item.name}
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

          <Grid>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body1">Price: ${item.curr_price}</Typography>
            <Typography variant="body2">Store: {item.shop}</Typography>
          </Grid>
          
          <Grid justifyContent="flex-end">
          {showFavorite && 
          (<IconButton
            onClick={handleFavClick}
              style = {{color: favorite ? 'red' : 'inherit'}}
            >
             {favorite ? <Favorite /> :  <FavoriteBorder />}
            </IconButton>)}


          {showDelete && <IconButton color="black"><Delete /></IconButton>}


          {showAddToCart && 
          (<Button 
            sx={{ml: 1}}
            variant="outlined"
            startIcon={<ShoppingCart />}
            onClick={handleCartClick}
            >
              Add to Cart
            </Button>
          )}
          </Grid>

        </CardContent>
      </Card>
    </Button>
    )
};

export default GroceryItem;