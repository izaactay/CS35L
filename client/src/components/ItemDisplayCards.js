import * as React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Grid, Container, CircularProgress, Box } from '@mui/material';
import GroceryItem from './GroceryItem'
const BASE_URL = process.env.REACT_APP_API_BASE_URL;


const ItemDisplayCards = (props) => {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  let API_URL;
  if (props.type == "favourites") {
    API_URL = BASE_URL + "/userFavouriteItems/"
  } else if (props.type == "cart") {
    API_URL = BASE_URL + "/userList"
  } else if (props.type == "search"){
    API_URL = BASE_URL + "/items/search/" + props.query;
  };
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
  console.log(items)
  if (loading) {
    return (
      <Box sx={{ display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: 500 }}>
        <CircularProgress />
    </Box>
    )
  } else {
    return (
      <div>
        {/* Display Items Section */}
        {items && <Grid sx={{ marginTop: 4, marginBottom: 4 }} container spacing={3}>
          {items.map(item => (
            <GroceryItem key={item.id} item={item} showAddToCart={true} />
          ))}
          
        
        </Grid>}
        <Box sx={{ display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: 500 }}>
              {items.length ? null : props.type ==="favourites" ? <Typography sx={{fontFamily: 'Raleway, sans-serif', fontSize: '30px'}}>You have nothing saved in favorites!</Typography>:<Typography sx={{fontFamily: 'Raleway, sans-serif', fontSize: '30px'}}>No items matched your search </Typography>  } 
          </Box>
        
      </div>
    );
  }
  


};

export default ItemDisplayCards;