const express = require('express')

const feedController = require('../controllers/feed')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/tweets', feedController.getTweets)

router.post('/tweet', isAuth, feedController.createTweet)

router.delete('/tweet/:tweetId', isAuth, feedController.deleteTweet)

module.exports = router