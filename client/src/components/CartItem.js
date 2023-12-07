import React, { useState, useEffect } from 'react';
import { isRouteErrorResponse, Link } from 'react-router-dom';
import {Box, Card, CardContent, CardMedia, Typography, Grid, IconButton, Button, TextField, } from '@mui/material';
import { FavoriteBorder, Favorite, Delete, ShoppingCart, Add, Remove } from '@mui/icons-material';
import {updateFavorite, updateCart} from '../modules/apiHelpers';
import {isFavoriteItem} from './GroceryItem';



const CartItem = ({ item, itemQty, showAddToCart = false,showFavorite = true, showDelete = false, onAddToCart, onToggleFavorite, onDelete }) => {
  const [favorite, setFavorite] = useState(false);
  const [qty, setQty] = useState(itemQty);
  
  useEffect(() => {
      setFavorite(isFavoriteItem(item.id)); 
  }, []);

  const handleFavClick = (event) => {
    event.preventDefault();
    updateFavorite(item);
    setFavorite(!favorite);
  }
  
  const handleAddClick = (event) => {
    event.preventDefault();
    updateCart(item,qty+1);
    setQty(qty+1);
  }

  const handleRemClick = (event) => {
    event.preventDefault();
    updateCart(item,qty-1);
    setQty(qty-1);
  }

    

return (
    <div>
    {(qty ? qty : null) && <Card sx={{ display: 'flex' }} elevation={0}>
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
                <Typography variant="body1">Price: ${item.curr_price}</Typography>
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
                    <IconButton onClick={handleRemClick}>
                        { (qty-1) ? <Remove /> : <Delete />}
                    </IconButton>
                    <Box>
                        <Typography>{ qty ? qty : null}</Typography>
                    </Box>
                    <IconButton onClick={handleAddClick}>
                        <Add />
                    </IconButton>
                    

            </Box>
        
        </Grid>
    </Card>}
    </div>
    )
};

export default CartItem;