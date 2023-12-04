require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const { supabase, verifyUser } = require('./modules/supabase');
const token = require('./modules/token');

// Middleware
app.use(cors());
app.use(express.json());

// Routers
app.use('/items', require('./routes/items'));
app.use('/userList', require('./routes/userList'));
app.use('/userFavouriteItems', require('./routes/userFavouriteItems'));

const PORT = 3001;

app.use(token.authenticate);
app.use(verifyUser);

// Apply the authentication middleware to the route
app.post('/add-to-wishlist', async (req, res) => {
  try {
    const userId = req.user;
    const { item } = req.body;

    // Perform Supabase insert in wishlist table
    const { data, error } = await supabase
      .from('wishlist')
      .insert([{ userId, item }]);

    if (error) {
      console.error('Error updating Supabase data:', error);
      return res.status(500).json({ error: 'Error updating Supabase data' });
    }

    console.log('Wishlist item added successfully:', data);
    res.status(200).json({ success: true, data });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
