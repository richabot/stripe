import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import {Link} from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import Meta from '../components/Meta.js'

import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions.js'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants.js'
import { CART_CLEAR } from '../constants/cartConstants.js'

const OrderScreen = ({history,match}) => {
    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] = useState(false)

    const orderID=match.params.id

    const userLogin = useSelector(state=> state.userLogin)
    const { userInfo } = userLogin

    const orderDetails = useSelector(state=> state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector((state)=> state.orderPay)
    const {loading:loadingPay, success:successPay} = orderPay

    const orderDeliver = useSelector((state)=> state.orderDeliver)
    const {loading:loadingDeliver, success:successDeliver} = orderDeliver

    if(!loading){
        const addDecimals = (num) =>{
        return(Math.round(num*100)/100).toFixed(2)
        }

        order.itemsPrice =addDecimals(order.orderItems.reduce((acc,item)=> acc+item.price * item.qty,0))
    }
    async function displayRazorPay(){
            const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
            if(!res){
                alert('Something went wrong')
                return 
            }
            const data =await fetch(`/api/payments/${orderID}`, {method:"POST"}).then((t)=>t.json())
    
            const options = {
            "key": "rzp_test_jffhfACN1gQNzj", // Enter the Key ID generated from the Dashboard
            "amount": data.amount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": data.currency,
            "name": order.user.name,
            "description": orderID,
            "image": "https://res.cloudinary.com/xzen/image/upload/f_webp/v1638709367/XZEN_m3ylq4.webp",
            "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "handler": function (response){
                successPaymentHandler(response)
             
            },
            "prefill": {
                "name": order.user.name,
                "email": order.user.email,
                "contact": "XXXXXXXXXX"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }
    function loadScript(src){
        return new Promise ((resolve)=>{
            const script = document.createElement("script");
            script.src = src;
            document.body.appendChild(script);
            script.onload = ()=>{
                resolve(true)
            }
            script.onerror = ()=>{
                resolve(false)
            }
            document.body.appendChild(script);
        })
        

    }

    useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }
        const addPayPalScript = async()=>{
            const {data:clientId} = await axios.get('/api/config/paypal') 
            const script = document.createElement('script')
            script.type='text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () =>{
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
   
        if(!order || order._id !== orderID || successPay || successDeliver) {
            dispatch({type:ORDER_PAY_RESET})
            dispatch({type:ORDER_DELIVER_RESET})
            dispatch({type:CART_CLEAR})
            dispatch(getOrderDetails(orderID))
    }else if(!order.isPaid){
        if(!window.paypal){
            addPayPalScript()
        }else{
            setSdkReady(true)
        }
    }
        
    },[dispatch,order,orderID, successPay, successDeliver, history, userInfo])

    const successPaymentHandler = (paymentResult)=>{
        dispatch(payOrder(orderID,paymentResult))
    }

    const deliverHandler = ()=>{
        dispatch(deliverOrder(order))
    }

    return loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>:
    <>
        <Meta title={order._id} />
        <h1>Order #{order._id}</h1>
        <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p><strong>Name: </strong>{order.user.name}</p>
                            <p><strong>Email: </strong> <a href={`mailto:${order.user.email}`} style={{textDecoration:"none"}}>{order.user.email}</a></p>
                            <p>
                                <strong>Address:</strong>
                                {order.shippingAddress.address},{order.shippingAddress.city} {' '},{order.shippingAddress.postalCode} {' '},{order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message variant='success'>Delivered On {order.deliveredAt}</Message>: <Message variant='danger'>Not Delivered </Message>}
                        </ListGroup.Item> 

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant='success'>Paid On {order.paidAt}</Message>: <Message variant='danger'>Not Paid </Message>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message>Order Is Empty!</Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index)=>(
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded></Image>
                                                </Col>

                                                <Col>
                                                    <Link to={`/product/${item.product}`} style={{textDecoration:"none"}}>{item.name}</Link>
                                                </Col>

                                                <Col md={4}>
                                                    {item.qty} X {item.price} = $ {item.price * item.qty}
                                                </Col>
                                                
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                         
                            {!order.isPaid && order.paymentMethod === 'Paypal'&&(
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader /> : <PayPalButton amount={order.totalPrice.toFixed(0)} onSuccess={successPaymentHandler}/>}
                                </ListGroup.Item>
                            )}

                            {!order.isPaid && order.paymentMethod !== 'Paypal' &&  (
                                <ListGroup.Item>
                                <Button type='button' className='btn btn-primary w-100' onClick={displayRazorPay} >
                                    Pay With {order.paymentMethod}
                                </Button>
                            </ListGroup.Item>
                            )}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroup.Item>
                                    {loadingDeliver && <Loader />}
                                    <Button onClick={deliverHandler} className="btn btn-primary w-100">Mark As Delivered</Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
    
    </>
}

export default OrderScreen
