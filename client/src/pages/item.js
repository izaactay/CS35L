import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Container, Card, CardMedia, CardContent, IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import { FavoriteBorder, Favorite, ShoppingCart } from '@mui/icons-material';
import {updateFavorite} from '../modules/apiHelpers';
import { isFavoriteItem } from '../components/GroceryItem';
const BASE_URL = process.env.REACT_APP_API_BASE_URL;



const Item = () => {


    const { itemId } = useParams();
    const [item, setItem] = useState();
    useEffect(() => {
        const fetchData = async () => {
            const item = await (
                await fetch(
                    BASE_URL + "/items/" + itemId
                )
            ).json();
            console.log(item);
            console.log('hello');
            setItem(item);

        };

        fetchData();

    }, []);

    const isFavorite = isFavoriteItem(+itemId);

    return (
        <Box>
            {item && <Container sx={{ marginTop: 4, display: 'flex', marginBottom: 4 }}>
                <Card sx={{ width: '40%', flexGrow: 1 }}>
                    <CardMedia
                        component="img"
                        image={item.img}
                        alt={item.name}
                        sx={{ height: '100%', aspectRatio: '1/1' }}
                    />
                </Card>
                <Box sx={{ marginLeft: 4, flexGrow: 2 }}>
                    <Typography variant="h2">{item.name}</Typography>
                    <Typography variant="h6">Price: ${item.curr_price}</Typography>
                    <Typography variant="h6">Store: {item.shop}</Typography>
                    {(<IconButton
                        onClick={(event) => {
                            event.preventDefault();
                            updateFavorite(item);}}
                            style = {{color: isFavorite ? 'red' : 'inherit'}}
                    >
                    {isFavorite ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>)}
                </Box>

            </Container>}
        </Box>
    );

};

export default Item;
