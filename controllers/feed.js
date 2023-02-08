const Tweet = require("../models/tweet")

exports.getTweets = (req, res, next) => {
    Tweet.find()
    .then(tweets => {
        res.status(200).json({message: 'Fetched tweets successfully.', tweets: tweets})
    })
}

exports.createTweet = (req, res, next) => {
    const tweet = new Tweet({
        content: req.body.content
    })
    tweet.save()
    .then(result => {
        res.status(201).json({
            message: 'Tweet created successfully.',
            tweet: tweet
        })
    })
}

