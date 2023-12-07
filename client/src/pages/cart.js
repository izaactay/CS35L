import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Stack, CircularProgress, Container } from '@mui/material';
import CartItem from '../components/CartItem';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const DisplayCart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = BASE_URL + "/userList"
  const supabaseToken = localStorage.getItem('supabaseToken')
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
        setLoading(false);
        console.log(response);
        setItems(response);
      } else {
        setLoading(false);
        console.log('error')
        console.log(response.error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: 500 }}>
        <CircularProgress />
    </Box>
    );
  } else {
    return (
      <div>
          {/* Display Items Section */}
          {items && <Stack sx={{ marginTop: 4, marginBottom: 4 }} spacing ={2}
                           >
            {items.map(item => (
              <CartItem key={item.item.id} item={item.item} itemQty={item.qty}/>
            ))}
  
          {items.length ? null : <Typography>You have nothing in your cart!</Typography>  }
        </Stack>}
      </div>
    );
  }

  
  
};



const Cart= () => {
  return (
    <div>
        {/* Display Items Section */}
        <Container sx={{ marginTop: 4 }}>
        <Typography sx={{fontFamily: 'Raleway, sans-serif', fontSize: '30px'}}>
          Your Cart
        </Typography>
        <DisplayCart />
      </Container>
    </div>

    
  );
};

export default Cart;
