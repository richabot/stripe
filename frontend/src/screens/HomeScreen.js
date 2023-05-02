import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import Message from '../components/Message';
import ProductCarousel from '../components/ProductCarousel';
import CTASection from '../components/CTASection';
import Categories from '../components/Categories';


const HomeScreen = ({match}) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;
    const dispatch = useDispatch()
    const productList=useSelector(state => state.productList)
    const { loading, error} = productList

    useEffect(()=>{
        dispatch(listProducts(keyword, pageNumber));

    },[dispatch, keyword, pageNumber])

    
    return (
        <>
        <Meta title='Home' />
           
            {/* {!keyword ? <ProductCarousel/> :<Link to='/' className='btn btn-outline-primary mb-3'>Back to Home</Link>} */}
    
            {loading ? <Loader>Loading...</Loader> : error ? <Message variant='danger'>{error}</Message> : 
            <div className="bg-white">
                    <div className="max-w-2xl mx-auto py-10 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
                        {!keyword && <CTASection/>}
                        <div id="collections">
                            {!keyword && <Categories/>}
                        </div>
                    </div>
            </div>
        }
            
        </>
    )
}

export default HomeScreen
