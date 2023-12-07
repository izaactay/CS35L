import * as React from 'react';
import { useState, useEffect } from 'react';
import { AppBar, Box, Toolbar, Typography, Stack, Divider, IconButton, TextField, Grid, Card, CardContent, CardMedia, Container } from '@mui/material';
import CartItem from '../components/CartItem';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const DisplayCart = () => {
  const [items, setItems] = useState([]);
  const API_URL = BASE_URL + "/userList"
  const supabaseToken = localStorage.getItem('supabaseToken')
  useEffect(() => {
    const fetchData = async () => {
      const response = await (
        await fetch(
          API_URL,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${supabaseToken}`,
            }
          }
        )
      ).json();

      if (!response.error) {
        console.log(response);
        setItems(response);
      } else {
        console.log('error')
        console.log(response.error);
      }
    };

    fetchData();
  }, []);



  return (
    <div>
        {/* Display Items Section */}
        {items && <Stack sx={{ marginTop: 4, marginBottom: 4 }} spacing ={2}
                         >
          {items.map(item => (
            <CartItem key={item.item.id} item={item.item} itemQty={item.qty}/>
          ))}


      </Stack>}
    </div>
  );
  
};



const Cart= () => {
  return (
    <div>
        {/* Display Items Section */}
        <Container sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Cart
        </Typography>
        <DisplayCart />
      </Container>
    </div>

    
  );
};

export default Cart;
