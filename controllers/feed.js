const Tweet = require("../models/tweet")
const user = require("../models/user")

exports.getTweets = (req, res, next) => {
    Tweet.find()
    .then(tweets => {
        res.status(200).json({message: 'Fetched tweets successfully.', tweets: tweets})
    })
}

exports.createTweet = (req, res, next) => {
    let author
    // console.log(req)
    const tweet = new Tweet({
        content: req.body.content,
        authorName: req.body.authorName,
        authorId: req.body.authorId
    })
    tweet.save()
    .then(result => {
        return user.findById(req.body.authorId)
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

