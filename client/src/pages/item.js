import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Container, Card, CardMedia, CardContent} from '@mui/material';



const item = () => {
    const item = {
        name: "Banana",
        store: "Ralphs",
        price: "$2",
        imageUrl: "https://media.istockphoto.com/id/162487071/photo/banana-bunch.jpg?s=1024x1024&w=is&k=20&c=hUqk05fjkCBeKSPqIluYj_QWhx9kMRUeAIXRJAzUnOQ=",
    };


    return(
        <Box>
            <Container sx={{ marginTop: 4, display: 'flex'}}>
                <Card sx={{ width: '40%', flexGrow: 1}}>
                    <CardMedia
                        component="img"
                        image={item.imageUrl}
                        alt={item.name}
                        />
                </Card>
                <Box  sx={{ marginLeft: 4, flexGrow: 2 }}>
                    <Typography variant="h2">{item.name}</Typography>
                    <Typography variant="h6">Price: {item.price}</Typography>
                    <Typography variant="h6">Store: {item.store}</Typography>
                </Box>
                
            </Container>
        </Box>
    )

}

export default item;