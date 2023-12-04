<<<<<<< Updated upstream
require('dotenv').config();
const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(express.json());

// Use cors middleware to enable CORS
app.use(cors());

// Supabase client
const { supabase, verifyUser } = require('./modules/supabaseServer');


// Routers
app.use('/items', require('./routes/items'));
app.use('/userList', require('./routes/userList'));
app.use('/userFavouriteItems', require('./routes/userFavouriteItems'));

const token = require('./modules/token')

const PORT = 3001;

// Apply the authentication middleware to the route
app.post('/add-to-wishlist', token.authenticate, async (req, res) => {
  try {
    // Perform Supabase insert in wishlist table
    const verifyResult = await verifyUser(req.header('Authorization'));
    if (verifyResult !== 0) {
      return res.status(verifyResult.status).json({ error: verifyResult.error });
    };

    const userId = req.user;
    const { item } = req.body;
    const { data, error } = await supabase
      .from('wishlist')
      .insert([{ userId: userId, item }]);

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
=======
const express = require('express')
require('dotenv').config()
// const { createClient } = require("./lib/supabase")
const app = express()
const port = 5500

const db = require('./db/index')

app.get('/', (req, res) => {
    res.send('Hello World!')

})

app.get('/wow', (req, res) => {
    res.send('Wow! Hello World!')

})

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})

// app.get("/auth/callback", async function (req, res) {
//   const code = req.query.code
//   const next = req.query.next ?? "/"

//   if (code) {
//     const supabase = createClient({ req, res })
//     await supabase.auth.exchangeCodeForSession(code)
//   }

//   res.redirect(303, `/${next.slice(1)}`)
// })

// app.post("/hello-world", async function (req, res, next) {
//     const { email, emailConfirm } = req.body
    
  
//     const supabase = createClient({ req, res })
// })
>>>>>>> Stashed changes
