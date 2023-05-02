import React from 'react'
import {Link} from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = (props) => {
    return (
        <Card className='my-3 p-3 rounded' style={{textAlign:"center"}}>
            <Link to={`/product/${props.product._id}`}>
                <Card.Img src={props.product.image} variant='top'></Card.Img>
            </Link>
            <Card.Body className='d-flex flex-column justify-content-between'>
                <Link to={`/product/${props.product._id}`} style={{textDecoration:"none"}}>
                    <Card.Title as='div'><strong>{props.product.name}</strong></Card.Title>
                </Link>
                <Card.Text as='div'>
                    <Rating value={props.product.rating} text={`${props.product.numReviews} reviews`} />
                </Card.Text>

                <Card.Text as='h3'>${props.product.price}</Card.Text>

            </Card.Body>
            
        </Card>
    )
}

Rating.defaultProps={
    color:'#f8e825'
}
export default Product
