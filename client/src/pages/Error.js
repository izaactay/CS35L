import {Typography, Card, Box } from '@mui/material';
import * as React from 'react';

function NotFound() {



return (

    <Box justifyContent="center"
    alignItems="center"
    display= 'flex'
    flexDirection= 'column'
    sx={{height: 500}} >
        <Card justifyContent="center"
                alignItems="center"
                elevation={0}>
        <Typography>Sorry! We couldn't find that page! Error 404</Typography>
    </Card>
    </Box>
    
)

}

export default NotFound;