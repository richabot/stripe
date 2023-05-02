import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js';


//Fetch All Products
// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async(req, res)=>{
    const pageSize=8;
    const page=Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    }: {}
    const count = await Product.countDocuments({...keyword})
    const products=await Product.find({ ...keyword }).limit(pageSize).skip(pageSize*(page-1))
    res.json({products, page, pages: Math.ceil(count/pageSize)})
})


//Fetch Individual Product
// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async(req, res)=>{
    const product=await Product.findById(req.params.id)
    if (product){
        res.json(product);
    }
    else{
        res.status(404)
        throw new Error('Product Not Found')
    }
})

// @desc    Fetch Products Based On Category
// @route   GET /api/products/category/:category
// @access  Public
const getProductByCategory = asyncHandler(async(req, res)=>{
    const pageSize = 8;
    const page=Number(req.query.pageNumber) || 1
    const count = await Product.countDocuments({category:req.params.category})
    const products=await Product.find({category: req.params.category}).limit(pageSize).skip(pageSize*(page-1))
    if (products){
        res.json({products, page, pages: Math.ceil(count/pageSize)});
    }
    else{
        res.status(404)
        throw new Error('Product Not Found')
    }
})

// @desc    Fetch Products Based On Header Category
// @route   GET /api/products/header/:hcategory
// @access  Public
const getProductHeader = asyncHandler(async(req, res)=>{
    const pageSize = 8;
    const page=Number(req.query.pageNumber) || 1
    const keyword = {
        description:{
            $regex:req.params.hcategory
        }
        
    }
    const count = await Product.countDocuments({...keyword})
    const products = await Product.find({...keyword}).limit(pageSize).skip(pageSize*(page-1))
    if(products){
        res.json({products, page, pages: Math.ceil(count/pageSize)});
    }
    else{
        res.status(404)
        throw new Error('Products Not Found')
    }
})
    

// @desc    Delete Single Product
// @route   DELETE /api/products/:id
// @access  Private [ADMIN ONLY]
const deleteProduct = asyncHandler(async(req, res)=>{
    const product=await Product.findById(req.params.id)
    if (product){
        await product.remove()
        res.json({message:'Product Deleted'})
    }
    else{
        res.status(404)
        throw new Error('Product Not Found')
    }
})


// @desc    Create Single Product
// @route   POST /api/products/create
// @access  Private [ADMIN ONLY]
const createProduct = asyncHandler(async(req, res)=>{

    const product = new Product({
        name:'Sample Name',
        price:0,
        user:req.user._id,
        image:'/images/sample.jpg',
        carousel_image:'/images/sample.jpg',
        brand:'Sample Brand',
        category:'Sample Category',
        countInStock:0,
        numReviews:0,
        description:'Sample Description'
    })
    const createdProduct=await product.save()
    res.status(201).json(createdProduct)
})

// @desc    Update Single Product
// @route   PUT /api/products/:id
// @access  Private [ADMIN ONLY]
const updateProduct = asyncHandler(async(req, res)=>{
    const {name,price,description,image,carousel_image,brand,category,countInStock}=req.body
    const product=await Product.findById(req.params.id) 
    if(product){
        product.name=name
        product.price=price
        product.description=description
        product.carousel_image=carousel_image
        product.image=image
        product.brand=brand
        product.category=category
        product.countInStock=countInStock
        const updatedProduct=await product.save()
        res.json(updatedProduct)
    }
    else{
        res.status(404)
        throw new Error('Product Not Found')
    }
   
})


// @desc    Create new review
// @route   PUT /api/products/:id/reviews
// @access  Private 
const createProductReview = asyncHandler(async(req, res)=>{
    const {rating,comment}=req.body
    const product=await Product.findById(req.params.id) 
    if(product){
        const alreadyReviewed = product.reviews.find(review=>review.user.toString()===req.user._id.toString())
        if(alreadyReviewed){
            res.status(400)
            throw new Error('You have already reviewed this product')
        }
        const review={
            name:req.user.name,
            rating:Number(rating),
            comment:comment,
            user:req.user._id
        }
        product.reviews.push(review)
        product.numReviews=product.reviews.length;
        product.rating=product.reviews.reduce((acc,item)=>item.rating+acc,0)/product.reviews.length;

        await product.save()
        res.status(201).json({message:'Review Created'})
    }
    else{
        res.status(404)
        throw new Error('Product Not Found')
    }
   
})


// @desc    Get Top Rated Product
// @route   PUT /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async(req, res)=>{
    const products = await Product.find({}).sort({rating:-1}).limit(3)  
    res.json(products)
})


export {
    getProducts,
    getProductById,
    deleteProduct,
    updateProduct,
    createProduct,
    createProductReview,
    getTopProducts,
    getProductByCategory,
    getProductHeader
}