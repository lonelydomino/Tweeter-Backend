const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tweetSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    authorName : {
        type: String,
        required: true
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likesCount: {
        type: Number,
        default: 0
        
    }
}, { timestamps: true })

module.exports = mongoose.model('Tweet', tweetSchema)