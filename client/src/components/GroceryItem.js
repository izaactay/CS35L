import React from 'react';
import { Link } from 'react-router-dom';
import {Card, CardContent, CardMedia, Typography, IconButton, Button, Grid} from '@mui/material';
import { FavoriteBorder, Favorite, Delete, ShoppingCart } from '@mui/icons-material';
import {updateFavorite} from './ItemDisplayCards';

export function isFavoriteItem(itemID){
  console.log("called is favorite function");
  const favorites = JSON.parse(localStorage.getItem('userFavorites'));
  console.log("user favorite items are ");
  console.log(favorites);
  if(favorites.some(item => item.id === itemID)){
    return true;
    console.log('item id was inside')
  }
  return false;
}


const GroceryItem = ({ item, showAddToCart = false,showFavorite = true, showDelete = false, onAddToCart, onToggleFavorite, onDelete }) => {

    const isFavorite = isFavoriteItem(item.id);

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
            <Typography variant="body1">Price: {item.curr_price}</Typography>
            <Typography variant="body2">Store: {item.shop}</Typography>
          </Grid>
          
          <Grid justifyContent="flex-end">
          {showFavorite && 
          (<IconButton
            onClick={(event)=>{
              event.preventDefault();
              updateFavorite(item);}}
              sx = {{color: isFavorite ? 'red' : 'inherit'}}
            >
             {isFavorite ? <Favorite /> :  <FavoriteBorder />}
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
          </Grid>

        </CardContent>
      </Card>
    </Button>
    )
};

export default GroceryItem;