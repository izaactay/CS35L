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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
