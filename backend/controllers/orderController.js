import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js';
import Razorpay from 'razorpay';
import shortid from 'shortid';
import sgMail from '@sendgrid/mail';
let date_ob = new Date();


//Create New Order [POST , PRIVATE]
// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async(req, res)=>{
    const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body
    if(orderItems && orderItems.length === 0){
        res.status(400)
        throw new Error('No Order Items!')
        return 
    }
    else{
        const order = new Order({
            user:req.user._id,orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})


// GET Order by ID [PRIVATE , GET]
// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderByID = asyncHandler(async(req, res)=>{
    const order=await Order.findById(req.params.id).populate('user', 'name email')

    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})


// Update Order to 'PAID' 
// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async(req, res)=>{
    const order=await Order.findById(req.params.id).populate('user', 'name email')

    if(order){

        order.isPaid=true
        order.paidAt=Date.now()
  
        if(req.body.id){
            order.paymentResult={
            id:req.body.id ,
            status: req.body.status,
            update_time:req.body.update_time,
            email_address:req.body.payer.email_address
            }
        }else{
            order.paymentResult={
                id:req.body.razorpay_payment_id ,
                update_time:date_ob.getDate()
            }
        }
        

        const updatedOrder = await order.save()

        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
        to: order.user.email, // Change to your recipient
        from: 'Your From Email ID', // Change to your verified sender
        templateId:'You SendGrid Template ID', //Your SendGrid template id
        dynamic_template_data:{
            "name":order.user.name.split(' ')[0],
            "email":order.user.email,
            "order_no":order._id,
            "address":order.shippingAddress.address,
            "city":order.shippingAddress.city,
            "country":order.shippingAddress.country,
            "pin_code":order.shippingAddress.postalCode,
            "phone_no":order.phone,
            "sub_total":order.orderItems.reduce((sum, item) => sum + (Number(item.price)*Number(item.qty)), 0),
            "shipping":order.shippingPrice,
            "tax":order.taxPrice,
            "total_price":order.totalPrice,
            "payment_method":order.paymentMethod,
            "order_link":order._id
        },
        }
        sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
        })

        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})

// Update Order to 'DELIVERED' 
// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private
const updateOrderToDelivered = asyncHandler(async(req, res)=>{
    const order=await Order.findById(req.params.id)

    if(order){
        order.isDelivered=true
        order.deliveredAt=Date.now()
    
        const updatedOrder = await order.save()
        res.json(updatedOrder)
    }else{
        res.status(404)
        throw new Error('Order not found')
    }
})


// Get Logged In User Order [PRIVATE , GET] [api/orders/myorder]
// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async(req, res)=>{
    const orders=await Order.find({user:req.user._id})
    res.json(orders)   
})

// Get All User Orders [PRIVATE , GET] [api/orders/myorder]
// @desc    Get all orders
// @route   GET /api/orders/
// @access  Private
const getOrders = asyncHandler(async(req, res)=>{
    const orders=await Order.find({}).populate('user', 'id name')
    res.json(orders)   
})


// Get All User Orders [PRIVATE , GET] [api/payments/:id]
// @desc    POST Payment Info
// @route   POST /api/payments/:id
// @access  Private
const razorPayOrder = asyncHandler(async(req, res)=>{
    const order=await Order.findById(req.params.id)
    const razorpay = new Razorpay({
        key_id: process.env.RAZOR_PAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
    const payment_capture=1
    const amount = order.totalPrice
    const currency = 'INR'
    const receipt = shortid.generate();

    const options = {
        amount: parseInt(amount*100),
        currency,
        receipt,
        payment_capture,
    }

    try{
    const response = await razorpay.orders.create(options)

    res.json({
        id: response.id,
        currency: 'INR',
        amount:response.amount,
        order
    }
    )
}catch(err){
    console.log("error is ",err)
    res.status(400)
    throw new Error(err)
}

})
export {addOrderItems, getOrderByID, updateOrderToPaid,updateOrderToDelivered, getMyOrders, getOrders, razorPayOrder}
