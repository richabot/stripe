import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import generateToekn from '../utils/generateToken.js';

//Login Auth
//[POST / PUBLIC]
//['/api/users/login']
const authUser = asyncHandler(async(req, res)=>{
    const {email, password} = req.body
    const user = await User.findOne({ email })
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToekn(user._id),
        })
    }
    else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async(req, res)=>{
    const {name, email, password} = req.body
    const userExists = await User.findOne({ email })
    if(userExists){
        res.send(401)
        throw new Error('User Already Exists!')
    }
    const user = await User.create({
        name,
        email,
        password
    })
    if (user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToekn(user._id),
        })

    }else{
        res.status(400)
        throw new Error('Invalid User Data!')
    }
})

// Update user profile  [Private Route]
// @route   PUT /api/users/profile
const updateUserProfile = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id)

    if(user){
      user.name=req.body.name || user.name
      user.email=req.body.email || user.email
      if(req.body.password){
          user.password=req.body.password
      }
        
    const updatedUser=await user.save()
    res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
            token:generateToekn(updatedUser._id),
        })
    }else{
        res.status(404)
        throw new Error('User Not Found!')
    }
})


// Get user profile  [Private Route]
// @route   GET /api/users/profile
const getUserProfile = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error('User Not Found!')
    }
})



// Get All Users  [Private Route / ADMIN ONLY]
// @route   GET /api/users
const getUsers = asyncHandler(async(req, res)=>{
    const users = await User.find({})
    res.json(users)
})

// DELETE User [Private Route/ADMIN ONLY]
// @route   DELETE /api/users/:id
const deleteUser = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.params.id)
    if(user){
        await user.remove()
        res.json({message:'User Removed!'})
    }else{
        res.status(404)
        throw new Error('User Not Found')
    }
})

// Get User By ID [PRIVATE / ADMIN ONLY]
// @route   GET /api/users/:id/edit
const getUserById = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.params.id).select('-password')
    if(user){
        res.json(user)
    }else{
        res.status(404)
        throw new Error('User Not Found')
    }
    
})


// Update user profile  [Private Route/ ADMIN ONLY][PUT]
// @route   PUT /api/users/:id
const updateUser = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.params.id)

    if(user){
      user.name=req.body.name || user.name
      user.email=req.body.email || user.email
      user.isAdmin = req.body.isAdmin  
    const updatedUser=await user.save()
    res.json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin,
        })
    }else{
        res.status(404)
        throw new Error('User Not Found!')
    }
})


export {
    authUser, getUserProfile, registerUser, updateUserProfile, getUsers, deleteUser, getUserById, updateUser
}