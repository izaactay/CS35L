import * as React from 'react';
import { useState, useEffect } from 'react';
import {Typography, Grid, Container } from '@mui/material';
import GroceryItem from './GroceryItem'
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const ItemDisplayCards = (props) => {
    const [items, setItems] = useState([]);
    console.log(props.type);
    let API_URL;
    if (props.type == "favourites") {
      API_URL = BASE_URL + "/userFavouriteItems/"
    } else if (props.type == "cart"){
      API_URL = BASE_URL + "/userList"
    };
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
          
          {items && <Grid sx={{ marginTop: 4 }} container spacing={3}>
            {items.map(item => (
              <GroceryItem key={item.id} item={item} />
            ))}

          </Grid>}
      </div>
  
      
    );
  };
  
  export default ItemDisplayCards;
  