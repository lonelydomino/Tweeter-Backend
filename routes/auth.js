const express = require('express')

const authController = require('../controllers/auth')
const User = require('../models/user')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

router.put('/signup', authController.signup)

router.post('/login', authController.login)

module.exports = router