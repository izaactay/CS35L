import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, TextField, Button } from '@mui/material';
import { Favorite, ShoppingCart, AccountCircle } from '@mui/icons-material';
import { Box } from '@mui/material';


const NavBar = () => (
    <div>
        
        <AppBar position="static" sx={{ bgcolor: 'white' }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1, color: 'black' }}>
                        <Button  component={Link} to="/">
                            <Typography variant="h6" sx={{ alignItems: 'flex-start', color: 'black' }}>
                                Grocery+
                            </Typography>
                        </Button>

                    </Box>
                
                
                
                    <TextField label="Search" variant="outlined" size="small" sx={{ mr: 2 }} />
                    
                    <IconButton color="black" component={Link} to="/favourites" ><Favorite /></IconButton>
                    <IconButton color="black" component={Link} to="/cart"><ShoppingCart /></IconButton>
                    <IconButton color="black" component={Link} to="/favourites"><AccountCircle /></IconButton>
                </Toolbar>
        </AppBar>
    </div>
);   

export default NavBar;