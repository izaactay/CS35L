const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const supabaseServer = require('./supabaseServer');
const supabase = supabaseServer.supabase;
// const jwtDecode = require("jwt-decode");

const app = express();
const PORT = 3001;
const JWT_SECRET = 'sJc9VtqYvylDhMTN74TsJHjcZ3FJ8cCqRBF5HYciRVDusulNxFqsrCITUAUDDReu3z3ZkuFZwmYESHUYSASEXw==';

app.use(bodyParser.json());

// Use cors middleware to enable CORS
app.use(cors());

// Middleware to verify the JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    console.log('Unauthorized - Token not provided');
    return res.status(401).json({ error: 'Unauthorized - Token not provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Forbidden - Invalid token');
      return res.status(403).json({ error: 'Forbidden - Invalid token' });
    }
    const decoded = jwt.decode(token);
    req.user = decoded.sub;
    console.log(req.user);
    next();
  });
};

// Apply the authentication middleware to the route
app.post('/add-to-wishlist', authenticateToken, async (req, res) => {
  try {
    console.log('Received request to add to wishlist:', req.body);
    
    const { item } = req.body;
    console.log('Item:', item);
  
    // Perform Supabase update based on userId
    console.log(req.user.id);
    const { data, error } = await supabase
    .from('wishlist')
    .insert([{ userId: req.user, item, created_at: new Date() }]);

    if (error) {
      console.error('Error updating Supabase data:', error);
      return res.status(500).json({ error: 'Error updating Supabase data' });
    }

    console.log('Wishlist item added successfully:', data);

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
