// Import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')

// Create a new express application named 'app'
const app = express()

// Set backend port to be either env variable or port 5000
const port = process.env.PORT || 5000

// Middleware that prints incoming requests to the servers console
app.use((req, res, next) => {
    console.log(`Request Endpoint: ${req.method} ${req.url}`)
    next()
})

// Configure bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// Configure CORS middleware
app.use(cors())

// Require route
const api = require('./routes/routes')

// Configure app to use the route
app.use('/api/v1/', api)

// Middleware to inform the express application to serve compiled react files
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static(path.join(__dirname, 'client/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
    })
}

// Catch any bad requests
app.get('*', (req, res) => {
    res.status(200).json({
        msg: 'Catch All'
    })
})

// Configure our server to listen on the port defined by port variable
app.listen(port, () => console.log(`BACK_END_SERVICE_PORT: ${port}`))
