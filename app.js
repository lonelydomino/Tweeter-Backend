const bodyParser = require('body-parser')
const express = require('express')
const feedRoutes = require('./routes/feed')


const app = express()
const mongoose = require('mongoose')
const MONGODB_URI = 'mongodb+srv://lonelydomino:testing123@cluster0.kk66egx.mongodb.net/messages?retryWrites=true&w=majority'

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use(bodyParser.json())

app.use('/feed', feedRoutes)



mongoose.connect(MONGODB_URI)
.then( result => {
    app.listen(8080)
})
.catch(err => console.log(err))