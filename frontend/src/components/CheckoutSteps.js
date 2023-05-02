import React from 'react'
import {Nav, Spinner} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'


const CheckoutSteps = ({step1, step2, step3, step4, act1,act2, act3 }) => {
    return (
        <Nav className="justify-content-center mb-4">
            <Nav.Item className="border border-dark">
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>Sign In <i className="fas fa-check-circle"></i></Nav.Link>
                    </LinkContainer>

                ):<Nav.Link disabled>Sign-In</Nav.Link>}
            </Nav.Item>

            <Nav.Item className="border border-dark">
                {step2 ? (
                    
                    <LinkContainer to='/shipping'>
                        <Nav.Link>Shipping {act1? (<Spinner size="sm" animation="grow" />)
                        :act2 || act3? <i className="fas fa-check-circle"></i> 
                        :''}</Nav.Link>
                    </LinkContainer>

                ):<Nav.Link disabled>Shipping</Nav.Link>}
            </Nav.Item>
           
            
            <Nav.Item className="border border-dark">
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>Payment {act2? (<Spinner size="sm" animation="grow" />):act3? <i className="fas fa-check-circle"></i> 
                        :'' }</Nav.Link>
                    </LinkContainer>

                ):<Nav.Link disabled>Payment</Nav.Link>}
            </Nav.Item>

            <Nav.Item className="border border-dark">
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>Place Order {act3? (<Spinner size="sm" animation="grow" />):''}</Nav.Link>
                    </LinkContainer>

                ):<Nav.Link disabled>Place Order</Nav.Link>}
            </Nav.Item>
            
        </Nav>
    )
}

export default CheckoutSteps
