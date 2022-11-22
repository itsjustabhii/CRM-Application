const express = require('express') 
const config = require('./config/config')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.sendStatus(200)
})

//Starting the server
app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
})