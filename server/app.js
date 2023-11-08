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