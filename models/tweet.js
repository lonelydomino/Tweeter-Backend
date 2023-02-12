const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tweetSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Tweet', tweetSchema)