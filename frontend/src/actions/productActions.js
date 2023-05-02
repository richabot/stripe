import axios from 'axios'
import { 
    PRODUCT_LIST_REQUEST, 
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_CATEGORY_REQUEST,
    PRODUCT_CATEGORY_SUCCESS,
    PRODUCT_CATEGORY_FAIL,
    PRODUCT_SORT_REQUEST,
    PRODUCT_SORT_SUCCESS,
    PRODUCT_SORT_FAIL
    

} from '../constants/productConstants.js'

export const listProducts = (keyword='', pageNumber='')=> async (dispatch)=>{
    try{
        dispatch({type: PRODUCT_LIST_REQUEST})

        const {data} = await axios.get(`http://localhost:5000/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)

        dispatch({type:PRODUCT_LIST_SUCCESS, payload:data,})

    }
    catch(error){
        dispatch({
            type:PRODUCT_LIST_FAIL, 
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}



export const listProductDetails = (id)=> async (dispatch)=>{
    try{
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`http://localhost:5000/api/products/${id}`)

        dispatch({type:PRODUCT_DETAILS_SUCCESS, payload:data,})

    }
    catch(error){
        dispatch({
            type:PRODUCT_DETAILS_FAIL, 
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}

export const listProductCategory = (category, pageNumber='')=> async (dispatch)=>{
    try{
        dispatch({type: PRODUCT_CATEGORY_REQUEST})
        if(category === 'Electronics' || category === 'Clothing' || category === 'Shoes' || category === 'Accessories' || category === 'Watches' || category === 'Perfumes'){
            const {data} = await axios.get(`http://localhost:5000/api/products/category/${category}?pageNumber=${pageNumber}`)
            dispatch({type:PRODUCT_CATEGORY_SUCCESS, payload:data,})
        }
        else{
            const {data} = await axios.get(`http://localhost:5000/api/products/header/${category}?pageNumber=${pageNumber}`)
            dispatch({type:PRODUCT_CATEGORY_SUCCESS, payload:data,})
        }

        

    }
    catch(error){
        dispatch({
            type:PRODUCT_CATEGORY_FAIL, 
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}

export const sortProducts = (sortBy, pageNumber='',category)=> async (dispatch)=>{
    try{
    
        const {data} = await axios.get(`http://localhost:5000/api/products/header/${category}?pageNumber=${pageNumber}`) 
        dispatch({type: PRODUCT_SORT_REQUEST})
        if(sortBy === 'Price: Low to High'){
            data.products.sort((a,b)=>{
                return a.price - b.price
            })

            dispatch({type: PRODUCT_SORT_SUCCESS})
            dispatch({type:PRODUCT_CATEGORY_SUCCESS, payload:data})
            
        }
        
        else if(sortBy === 'Price: High to Low'){
            data.products.sort((a,b)=>{
                return b.price - a.price
            })
            dispatch({type: PRODUCT_SORT_SUCCESS})
            dispatch({type:PRODUCT_CATEGORY_SUCCESS, payload:data})

        }
        else if (sortBy === 'Best Rating'){
            data.products.sort((a,b)=>{
 
                return b.rating - a.rating
            })
            dispatch({type: PRODUCT_SORT_SUCCESS})
            dispatch({type:PRODUCT_CATEGORY_SUCCESS, payload:data})

        }
        else if(sortBy === 'Newest'){
            data.products.sort((a,b)=>{
          
                const bval=(b.createdAt.slice(0,10)).replace(new RegExp('-', 'g'),'' );
                const aval=(a.createdAt.slice(0,10)).replace(new RegExp('-', 'g'),'' );
                return Number(bval) - Number(aval)
            })
            dispatch({type: PRODUCT_SORT_SUCCESS})
            dispatch({type:PRODUCT_CATEGORY_SUCCESS, payload:data})

        }
        else if(sortBy === 'Most Popular'){
            data.products.sort((a,b)=>{
                return b.reviews.length - a.reviews.length
            })
            dispatch({type: PRODUCT_SORT_SUCCESS})
            dispatch({type:PRODUCT_CATEGORY_SUCCESS, payload:data})

        }
    }
    catch(error){
        dispatch({
            type:PRODUCT_SORT_FAIL, 
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })

    }}


export const deleteProduct = (id)=> async(dispatch, getState )=>{
    try{
        dispatch({
            type:PRODUCT_DELETE_REQUEST
        })
        const {userLogin:{userInfo}} = getState()
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`http://localhost:5000/api/products/${id}`,config)
        
        dispatch({
            type:PRODUCT_DELETE_SUCCESS,
        })
        


    }catch(error){
        dispatch({
            type:PRODUCT_DELETE_FAIL, 
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}


export const createProduct = ()=> async(dispatch, getState )=>{
    try{
        dispatch({
            type:PRODUCT_CREATE_REQUEST
        })
        const {userLogin:{userInfo}} = getState()
        const config = {
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.post(`http://localhost:5000/api/products/create`,{},config)
        
        dispatch({
            type:PRODUCT_CREATE_SUCCESS,
            payload:data
        })
        


    }catch(error){
        dispatch({
            type:PRODUCT_CREATE_FAIL, 
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}

export const updateProduct = (product)=> async(dispatch, getState )=>{
    try{
        dispatch({
            type:PRODUCT_UPDATE_REQUEST
        })
        const {userLogin:{userInfo}} = getState()
        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`http://localhost:5000/api/products/${product._id}`,product,config)
        
        dispatch({
            type:PRODUCT_UPDATE_SUCCESS,
            payload:data
        })
        


    }catch(error){
        dispatch({
            type:PRODUCT_UPDATE_FAIL, 
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}


export const createProductReview = (productId, review)=> async(dispatch, getState )=>{
    try{
        dispatch({
            type:PRODUCT_CREATE_REVIEW_REQUEST
        })
        const {userLogin:{userInfo}} = getState()
        const config = {
            headers:{
                'Content-type':'application/json',
                Authorization:`Bearer ${userInfo.token}`
            }
        }
        await axios.post(`http://localhost:5000/api/products/${productId}/reviews`,review,config)
        
        dispatch({
            type:PRODUCT_CREATE_REVIEW_SUCCESS,
        })
        


    }catch(error){
        dispatch({
            type:PRODUCT_CREATE_REVIEW_FAIL, 
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}


export const listTopProducts = ()=> async (dispatch)=>{
    try{
        dispatch({type: PRODUCT_TOP_REQUEST})
        const {data} = await axios.get(`http://localhost:5000/api/products/top`)

        dispatch({type:PRODUCT_TOP_SUCCESS, payload:data,})

    }
    catch(error){
        dispatch({
            type:PRODUCT_TOP_FAIL, 
            payload:error.response && error.response.data.message ? error.response.data.message:error.message
        })
    }
}