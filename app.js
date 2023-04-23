const bodyParser = require('body-parser')
const path = require('path')

const express = require('express')
const feedRoutes = require('./routes/feed')
const authRoutes = require('./routes/auth')

const multer = require('multer')
require('dotenv').config()

const app = express()
const mongoose = require('mongoose')

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.use(bodyParser.json())
app.use(multer({ storage: fileStorage, fileFilter: fileFilter}).single('image'))
app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/feed', feedRoutes)
app.use('/auth', authRoutes)


mongoose.connect(process.env.MONGODB_URI)
.then( result => {
    app.listen(8080)
})
.catch(err => console.log(err))