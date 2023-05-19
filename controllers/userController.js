const asyncHnadler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const User = require('../model/userModel')

// @desc    Get users
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHnadler(async (req, res) => {
    const {_id, name, email, password} = await User.findById(req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email
    })
})

// @desc    Authenticate an User
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHnadler(async (req, res) => {
    const {email, password} = req.body

    // check for user email
    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Incorrect crdentials')
    }
})

// @desc    Register user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHnadler(async (req, res) => {
    const {name, email, password} = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if(user){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user Data')
    }
})

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private
const updateUser = asyncHnadler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error('User not found')
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedUser)
})

// @desc    Detele user
// @route   DELETE /api/users/:id
// @access  Private
const deleteUser = asyncHnadler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error('User not found')
    }

    await user.remove

    res.status(200).json({id : req.params.id})
})

// Generate JWT

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : '30d'
    })
}



module.exports = {
    getMe,
    loginUser,
    registerUser
}