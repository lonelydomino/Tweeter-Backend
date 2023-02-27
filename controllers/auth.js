const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.signup = (req, res, next) => {
    const email = req.body.email
    const name = req.body.name
    const password = req.body.password
    const handle = req.body.handle
    bcrypt.hash(password, 12)
    .then(hashedPassword => {
        const user = new User({
            email: email,
            password: hashedPassword,
            name: name,
            handle: handle
        })
        return user.save()
    })
    .then(result => {
        const token = jwt.sign({ email: result.email, userId: result._id.toString()}, process.env.JWT_SECRET, { expiresIn: '1h'})
        res.status(201).json({ token: token, message: 'User created.', userId: result._id, handle: result.handle})
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
}

exports.login = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    let loadedUser

    User.findOne({email: email})
    .then(user => {
        if(!user) {
            const error = new Error('A user with this email could not be found.')
            error.statusCode = 401
            throw error
        }
        loadedUser = user
        return bcrypt.compare(password, user.password)
    })
    .then(isEqual => {
        if(!isEqual) {
            const error = new Error('Wrong Password.')
            error.statusCode = 401
            throw error
        }
        const token = jwt.sign({ email: loadedUser.email, userId: loadedUser._id.toString()}, process.env.JWT_SECRET, { expiresIn: '1h'})
        res.status(200).json({token: token, name: loadedUser.name, handle: loadedUser.handle, userId: loadedUser._id.toString(), likedTweets: loadedUser.likedTweets})
        
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err)
    })
}
