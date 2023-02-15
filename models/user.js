const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email:  {
        type: String,
        required: true
    },
    handle: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tweets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tweet'
        }
    ]
})

module.exports = mongoose.model('User', userSchema)