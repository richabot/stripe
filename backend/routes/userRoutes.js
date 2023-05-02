import express from 'express';
import { authUser, getUserProfile, registerUser, updateUserProfile, getUsers,deleteUser, getUserById, updateUser } from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router=express.Router()



//Fetch All Products
router.route('/').get(protect,admin, getUsers)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile).put(protect,updateUserProfile)
router.route('/register').post(registerUser)
router.route('/:id').delete(protect,admin,deleteUser).get(protect, admin, getUserById).put(protect,admin,updateUser)



export default router