import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { listProductCategory} from '../actions/productActions';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import Message from '../components/Message';
import Rating from '../components/Rating';
import ProductScreenCategory from '../components/ProductScreenCategory';
import { listProducts } from '../actions/productActions';


const ProductsScreen = ({match}) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;
    const category = match.params.category || match.params.hcategory;
  

    const dispatch = useDispatch()
    const productCategory=useSelector(state => state.productCategory)
    const { loading, error, products, page, pages } = productCategory

    const productList=useSelector(state => state.productList)
    const { products:keyProd } = productList


    useEffect(()=>{
        dispatch(listProductCategory(category,pageNumber));
        dispatch(listProducts(keyword, pageNumber));

    },[dispatch, category, keyword, pageNumber])

    
    return (
        <>
        <Meta title='Home' />
            {loading ? <Loader>Loading...</Loader> : error ? <Message variant='danger'>{error}</Message> : 
            <div className="bg-white">
                    <div className="max-w-2xl mx-auto py-10 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
                        { category && <ProductScreenCategory category={category} /> }

                        <h2 id="products"className="text-2xl font-extrabold tracking-tight text-gray-900">{category}</h2>
                        <div className="mt-1 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {!keyword && products.map((product) => (
                            <div key={product._id} className="group relative">
                            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                <h3 className="text-sm text-gray-700">
                                    <Link to={`/product/${product._id}`} style={{textDecoration:"none"}}>
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    {product.name}
                                    </Link>
                                </h3>
                                <p className="text-sm text-gray-500" style={{marginTop:"-1.2rem"}}>${product.price}</p>
                                <div style={{marginTop:"-0.7rem"}}>
                                <Rating value={product.rating} text={product.numReviews} className="mt-0 text-sm text-gray-500"/>
                                </div>
                                </div>
                                {/* <p className="text-sm font-medium text-gray-900" style={{marginTop:"1.05rem"}}>${product.price}</p> */}
                            </div>
                            </div>
                        ))}
                        {keyword && keyProd.map((product) => (
                            <div key={product._id} className="group relative">
                            <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                <h3 className="text-sm text-gray-700">
                                    <Link to={`/product/${product._id}`} style={{textDecoration:"none"}}>
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    {product.name}
                                    </Link>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">${product.price}</p>
                                <Rating value={product.rating} text={product.numReviews} className="mt-1 text-sm text-gray-500"/>
                                </div>
                                {/* <p className="text-sm font-medium text-gray-900">{product.price}</p> */}
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
        }
            
             <Paginate page={page} pages={pages} pageNumber={pageNumber} category={category ? category : ''}></Paginate>   
            
        </>
    )
}

export default ProductsScreen;