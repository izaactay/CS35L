import React, { useState, useEffect } from 'react';
import { isRouteErrorResponse, Link } from 'react-router-dom';
import {Box, Card, CardContent, CardMedia, Typography, Grid, IconButton, Button, TextField, } from '@mui/material';
import { FavoriteBorder, Favorite, Delete, ShoppingCart, Add, Remove } from '@mui/icons-material';
import {updateFavorite} from '../modules/apiHelpers';

export function isFavoriteItem(itemID){
  console.log("called is favorite function");
  const favorites = JSON.parse(localStorage.getItem('userFavorites'));
  console.log("user favorite items are ");
  console.log(favorites);
  if(favorites.some(item => item.id === itemID)){
    return true;
  }
  return false;
}


const CartItem = ({ item, showAddToCart = false,showFavorite = true, showDelete = false, onAddToCart, onToggleFavorite, onDelete }) => {
  const [favorite, setFavorite] = useState(false);
  
  useEffect(() => {
      setFavorite(isFavoriteItem(item.id)); 
  }, []);

  const handleFavClick = (event) => {
    event.preventDefault();
    updateFavorite(item);
    setFavorite(!favorite);
  }
  
    

return (
    
    <Card sx={{ display: 'flex' }} elevation={0}>
        <Grid container direction="row">
        <Box sx={{ width: 151,
                      height: 151 }}
                      display="flex"
                      justifyContent="center"
                      alignItems="center">
        <CardMedia
                component="img"
                sx={{ width: 100,
                      height: 100 }}
                
                image={item.img}
                alt={item.name}
            />
        </Box>
        <Grid xs={8} sx={{ display: 'flex', flexDirection: 'column' }}>
            
            <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body1">Price: {item.curr_price}</Typography>
                <Typography variant="body2">Store: {item.shop}</Typography>
                {showFavorite && 
                (<IconButton
                onClick={handleFavClick}
                    style = {{color: favorite ? 'red' : 'inherit'}}
                >
                    {favorite ? <Favorite /> :  <FavoriteBorder />}
                </IconButton>)}


                {showDelete && <IconButton color="black"><Delete /></IconButton>}
            </CardContent>
        </Grid>
        
            <Box sx={{ display: 'flex', flexDirection: 'row' }} display="flex"
                        justifyContent="center"
                        alignItems="center">
                    <IconButton>
                        <Remove />
                        
                    </IconButton>
                    <Box>
                        <Typography>{item.qty}</Typography>
                    </Box>
                    <IconButton>
                        <Add />
                    </IconButton>
                    {/* <Button 
                    sx={{ml: 1}}
                    variant="outlined"
                    startIcon={<ShoppingCart />}
                    //onClick function to be implemented
                    >
                        Add to Cart
                    </Button> */}
                    

                
            </Box>
        
        </Grid>
    </Card>
    
    )
};

export default CartItem;