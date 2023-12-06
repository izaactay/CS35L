import * as React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Grid, Container } from '@mui/material';
import GroceryItem from './GroceryItem'
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function updateFavorite(itemToFav) {

  console.log("called update favorite function");

  const FAV_URL = BASE_URL + "/userFavouriteItems/";
  const supabaseToken = localStorage.getItem('supabaseToken');

  const fetchData = async () => {
    const response = await (
      await fetch(
        FAV_URL,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${supabaseToken}`,
          }
        }
      )
    ).json();

    if (response.error) {
      console.log('error = ' + response.error);
    }

    else {
      console.log(response)
      const isItemInList = response.some(item => item.id === itemToFav.id)

      const action = isItemInList ? "remove" : "add";

      const actionURL = `${BASE_URL}/userFavouriteItems/${action}`;

      const putResponse = await (
        await fetch(
          actionURL,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${supabaseToken}`,
            },
            body: JSON.stringify([itemToFav.id])
          }
        )
      ).json();

      console.log("putResponse status code: ", putResponse.status);

      if (putResponse.ok) {
        // Handle success
        console.log(action === 'add' ? 'Added to favorites' : 'Removed from favorites');
      } else {
        // Handle error
        console.error('Error updating favorites:', putResponse.statusText);
      }
    }
  }
  fetchData();
};

const ItemDisplayCards = (props) => {

  const [items, setItems] = useState([]);
  console.log(props.type);
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

  if (items) {
    if (props.type != "cart") {
      return (
        <div>
          {/* Display Items Section */}
          {items && <Grid sx={{ marginTop: 4, marginBottom: 4 }} container spacing={3}>
            {items.map(item => (
              <GroceryItem key={item.id} item={item} showAddToCart={true} />
            ))}

          </Grid>}
        </div>
      );
    }

    else if (props.type == "cart") {
      return (
        <div>
          {/* Display Items Section */}
          {items && <Grid sx={{ marginTop: 4, marginBottom: 4 }} container spacing={3}>
            {items.map(item => (
              <GroceryItem key={item.id} item={item} />
            ))}

          </Grid>}
        </div>
      );
    }
  }

};

export default ItemDisplayCards;