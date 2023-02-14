const Tweet = require("../models/tweet")
const User = require("../models/user")

exports.getTweets = (req, res, next) => {
    Tweet.find()
    .then(tweets => {
        res.status(200).json({message: 'Fetched tweets successfully.', tweets: tweets})
    })
}

exports.createTweet = (req, res, next) => {
    let author

    const tweet = new Tweet({
        content: req.body.content,
        authorName: req.body.authorName,
        authorId: req.body.authorId
    })
    tweet.save()
    .then(result => {
        return User.findById(req.body.authorId)
    })
    .then(user => {
        author = user
        user.tweets.push(tweet)
        return user.save()
    })
    .then(result => {
        res.status(201).json({
            message: 'Tweet created successfully.',
            tweet: tweet
        })
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
}

exports.deleteTweet = (req, res, next) => {
    const tweetId = req.params.tweetId
    console.log(req.params)
    Tweet.findById(tweetId)
    .then(tweet => {
        console.log(req)
        if(!tweet){
            const error = new Error('Could not find tweet')
            error.statusCode = 404
            throw error
        }
        if(tweet.authorId.toString() !== req.userId){
            const error = new Error('Not authorized.')
            error.statusCode = 403
            throw error
        }
        return Tweet.findByIdAndRemove(tweetId)
    })
    .then(result => {
        return User.findById(req.userId)
    })
    .then(result => {
        res.status(200).json({message: 'Deleted Tweet'})
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
}
