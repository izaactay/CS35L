import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Container, Card, CardMedia, CardContent} from '@mui/material';
import { useParams } from 'react-router-dom';
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

    },[]);
    
    return(
        <Box>
            {item && <Container sx={{ marginTop: 4, display: 'flex', marginBottom: 4}}>
                <Card sx={{ width: '40%', flexGrow: 1}}>
                    <CardMedia
                        component="img"
                        image={item.img}
                        alt={item.name}
                        sx={{ height: '100%', aspectRatio: '1/1'}}
                        />
                </Card>
                <Box  sx={{ marginLeft: 4, flexGrow: 2 }}>
                    <Typography variant="h2">{item.name}</Typography>
                    <Typography variant="h6">Price: ${item.curr_price}</Typography>
                    <Typography variant="h6">Store: {item.shop}</Typography>
                </Box>
                
            </Container>}
        </Box>
    );

};

export default Item;