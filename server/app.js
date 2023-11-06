const express = require('express')
const app = express()
const port = 5500

app.get('/', (req, res) => {
    res.send('Hello World!')

})

app.get('/wow', (req, res) => {
    res.send('Wow! Hello World!')

})

app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})
