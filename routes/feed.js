const express = require('express')

const feedController = require('../controllers/feed')

const router = express.Router()

router.get('/tweets', feedController.getTweets)

router.post('/tweet', feedController.createTweet)

module.exports = router