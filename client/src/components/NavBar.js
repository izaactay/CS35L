import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, TextField, Button, InputAdornment} from '@mui/material';
import { Favorite, ShoppingCart, AccountCircle } from '@mui/icons-material';
import { Box } from '@mui/material';
import logo from '../images/grocery_logo.png';
import * as Icons from '@mui/icons-material/';


const NavBar = () => (
    <div>
        <AppBar position="static" sx={{ bgcolor: 'white' }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1, color: 'black' }}>
                        <Button  component={Link} to="/">
                            <img src={logo} alt="Grocery+" style={{height: '70px'}}/>
                        </Button>

                    </Box>

                
                    <TextField label="Search" variant="outlined" size="small" sx={{mr: 2, width: '250px'}} 
                        InputProps={{startAdornment: (
                            <InputAdornment position="start">
                                <Icons.Search/>
                            </InputAdornment>
                        )}}
                    />
                    
                    <Button
                        sx={{fontFamily: 'Raleway, sans-serif', fontSize: '16px'}}
                        component={Link}
                        to="/favorites"
                        startIcon={<Icons.Favorite />}
                        style={{ color: '#708238' }}
                    >
                    Favorites
                    </Button>
                    <Button
                        sx={{fontFamily: 'Raleway, sans-serif', fontSize: '16px'}}
                        component={Link}
                        to="/cart"
                        startIcon={<Icons.ShoppingCart />}
                        style={{ color: '#708238' }}
                    >
                    Cart
                    </Button>
                    <Button
                        sx={{fontFamily: 'Raleway, sans-serif', fontSize: '16px'}}
                        component={Link}
                        to="/login"
                        startIcon={<Icons.AccountCircle />}
                        style={{ color: '#708238' }}
                    >
                    Account
                    </Button>
                    {/* <IconButton style={{color: "#708238"}}component={Link} to="/favorites" ><Favorite /></IconButton>
                    <IconButton style={{color: "#708238"}}component={Link} to="/cart"><ShoppingCart /></IconButton>
                    <IconButton style={{color: "#708238"}} component={Link} to="/login"><AccountCircle /></IconButton> */}
                </Toolbar>
        </AppBar>
    </div>
);   

export default NavBar;