import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Meta from '../components/Meta';
import Rating from '../components/Rating';
import {Row, Col, Image, ListGroup, Card, Button, Form, ListGroupItem} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProductDetails, createProductReview } from '../actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';


const ProductScreen = (props) => {
    const [qty, setQty] = useState(1)

    const [rating, setRating] = useState(0)

    const [comment, setComment] = useState('')
    const dispatch=useDispatch()

    const productDetails = useSelector(state=> state.productDetails)
    const {loading, error, product} = productDetails
    

    const productReviewCreate = useSelector(state=> state.productReviewCreate)
    const {error:errorProductReview, success:successProductReview} = productReviewCreate

    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin
    var reviews = [product.reviews.filter(review=> review.rating===5).length*100/product.reviews.length+'%',
        product.reviews.filter(review=> review.rating===4).length*100/product.reviews.length+'%', 
        product.reviews.filter(review=> review.rating===3).length*100/product.reviews.length+'%', 
        product.reviews.filter(review=> review.rating===2).length*100/product.reviews.length+'%', 
        product.reviews.filter(review=> review.rating===1).length*100/product.reviews.length+'%'
    ]

    useEffect(()=>{
        if(successProductReview){
            alert("Review Submitted!")
            setRating(0)
            setComment('')
            dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(listProductDetails(props.match.params.id))
        
    },[dispatch,props.match, successProductReview])
    
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(props.match.params.id, {rating:rating, comment:comment}))
    }

    const addToCartHandler=()=>{
        props.history.push(`/cart/${props.match.params.id}?qty=${qty}`)
    }
    
    return (
        <>
            <Link className="btn btn-outline-dark my-3" to="/">Go Back</Link>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error} </Message> : (<>
            <Meta title={product.name} description={product.description}/>
                <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid></Image>
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item >
                            <Rating value={product.rating} text={`${product.numReviews} reviews `}/> 
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Brand: {product.brand}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Description:</strong> {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>
                                        <strong>
                                            ${product.price}
                                        </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>
                                        <strong className={product.countInStock >0 ? 'text-primary' : 'text-danger'}>
                                            {product.countInStock >0 ? 'In Stock' : 'Out Of Stock'}
                                        </strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock>0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <Form.Control className="form-select" as="select" value={qty} onChange={(e)=>setQty(e.target.value)}>
                                                {[...Array(product.countInStock).keys()].map((x)=>(
                                                    <option key={x+1} value={x+1}>{x+1}</option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                <Button onClick={addToCartHandler} className='btn btn-primary w-100' type="button" variant="primary" disabled={product.countInStock === 0}>Add To Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        
            <Row>
                <Col md={6}>
                    <h3>Reviews</h3>
                    {product.reviews.length === 0 && <Message>No Reviews</Message>}
                    <ListGroup>
                        {product.reviews.map(review=>(
                            <ListGroup.Item key={review._id}>
                                <Row>
                                    <Col>
                                        <h5 style={{fontWeight:"bold"}}>{review.name}</h5>
                                        <Rating value={review.rating} text={`${review.rating} stars`}/>
                                        <p>{review.createdAt.substring(0,10)}</p>
                                    </Col>
                                </Row>
                                <p style={{fontStyle:"italic"}}>{review.comment}</p>
                            </ListGroup.Item>
                        ))}
                        <ListGroupItem>
                            <h2>Write Customer Review</h2>
                            {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                            {userInfo ? (<Form onSubmit={submitHandler}>
                                <Form.Group controlId='rating'>
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control className="form-select" as="select" value={rating} onChange={(e)=>setRating(e.target.value)}>
                                        <option value=''>Select ...</option>
                                        <option value='1'>1 - Poor</option>
                                        <option value='2'>2 - Fair</option>
                                        <option value='3'>3 - Good</option>
                                        <option value='4'>4 - Very Good</option>
                                        <option value='5'>5 - Excellent</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId='comment'>
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control as="textarea" row='3' value={comment} onChange={(e)=>setComment(e.target.value)}/>
                                </Form.Group>
                                <Button type="submit" variant="primary">Submit</Button>
                            </Form>) : <Message>You need to <Link to='login'>login</Link> to write a review</Message>}
                        </ListGroupItem>
                    </ListGroup> 
                </Col>

                <Col md={6}>
                    <h3>Overall Rating</h3>
                    <ListGroupItem>
                    <Rating value={product.rating} text={`Based on ${product.numReviews} reviews `}/>
                    <p></p>
                         
                        <div className="d-flex">
                            <div className="text-center m-2" >
                                <span className="display-4 font-weight-bolder">{product.rating}</span>
                                <div className>
                                    out of 5
                                </div>
                                 
                                
                            </div>
                            <div className="flex-grow-1">
                                {reviews.map((review, index)=>(
                                    <div className="row align-items-center">
                                    <div className="col-3 text-right">
                                        {reviews.length-index} <i style={{color:"rgb(248, 232, 37)"}}className="fas fa-star"></i>
                                    </div>
                                    <div className="col-8">
                                        <div className="progress" style={{height:"15px"}}>
                                        {review === 'NaN%' ? 
                                            <div className="progress-bar" role="progressbar" style={{width:'100%'}} aria-valuenow="100" 
                                            aria-valuemin="0" aria-valuemax="100">0%</div>
                                        :
                                            <div className="progress-bar" role="progressbar" style={{width:review}} aria-valuenow="100" 
                                            aria-valuemin="0" aria-valuemax="100">{review}</div>
                                        }
                                        </div>
                                    </div>
                                    </div> ))
                                    }

                            </div>
                        </div>
                     </ListGroupItem>   
                </Col>
            </Row>
            </>
            )}  
        </>
    )
}
            

export default ProductScreen
