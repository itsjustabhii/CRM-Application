const express = require('express') 
const config = require('./config/config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.sendStatus(200)
})


//Starting the server
mongoose.connect('mongodb://localhost/demodb', {family:4}, (err) => {
    if(err) {
        console.log('Error occurred');
    }
    else {
        console.log('Connected');
        app.listen(port, () => {
            console.log(`Example app listening at port http://localhost:${port}`);
        })
    }
})

