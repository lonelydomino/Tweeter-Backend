const express = require('express')
const authController = require('../controllers/auth')
const User = require('../models/user')

const router = express.Router()

router.put('/signup', authController.signup)

module.exports = router