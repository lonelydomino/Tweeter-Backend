const bodyParser = require('body-parser')
const express = require('express')
const feedRoutes = require('./routes/feed')
const authRoutes = require('./routes/auth')
require('dotenv').config()

const app = express()
const mongoose = require('mongoose')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use(bodyParser.json())

app.use('/feed', feedRoutes)
app.use('/auth', authRoutes)


mongoose.connect(process.env.MONGODB_URI)
.then( result => {
    app.listen(8080)
})
.catch(err => console.log(err))