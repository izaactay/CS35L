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
          const items = await ( 
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
          console.log(items);
          setItems(items);
              
      };
  
      fetchData();
  
  },[]);
  
    return (
      <div>
          {/* Display Items Section */}
          
          <Grid sx={{ marginTop: 4 }} container spacing={3}>
            {items.map(item => (
              <GroceryItem key={item.id} item={item} />
            ))}
          </Grid>
      </div>
  
      
    );
  };
  
  export default ItemDisplayCards;
  