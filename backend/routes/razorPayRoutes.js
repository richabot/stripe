import express from "express";
import { razorPayOrder } from "../controllers/orderController.js";

const router=express.Router()


router.route('/:id').post(razorPayOrder)



export default router