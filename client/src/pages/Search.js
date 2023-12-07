import React, { useState, useEffect } from "react";
import {Typography, Container } from '@mui/material';
import ItemDisplayCards from '../components/ItemDisplayCards';
import { useParams } from 'react-router-dom';




const Search = (props) => {
    const {searchQuery} = useParams();
    

    return(
        <div>
        {/* Display Items Section */}
        <Container sx={{ marginTop: 4 }}>
        <Typography sx={{fontFamily: 'Raleway, sans-serif', fontSize: '30px'}}>
          Search Results for {searchQuery}
        </Typography>
        <ItemDisplayCards type={"search"} query={searchQuery}/>
      </Container>
    </div>

    )
}


export default Search;