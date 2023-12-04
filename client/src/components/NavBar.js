import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, TextField } from '@mui/material';
import { Favorite, ShoppingCart, AccountCircle } from '@mui/icons-material';


const NavBar = () => (
    <div>
        
        <AppBar position="static" sx={{ bgcolor: 'white' }}>
                <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, color: 'black' }}>
                    Grocery+
                </Typography>
                
                <TextField label="Search" variant="outlined" size="small" sx={{ mr: 2 }} />
                <nav>
                    <ul>
                        <li>
                            <Link to="/favourites"><IconButton color="black"></IconButton></Link>
                        </li>
                    </ul>
                </nav>
                <IconButton color="black"><Favorite /></IconButton>
                <IconButton color="black"><ShoppingCart /></IconButton>
                <IconButton color="black"><AccountCircle /></IconButton>
                </Toolbar>
        </AppBar>
    </div>
);   

export default NavBar;