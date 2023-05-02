import React from 'react'
import { Link } from 'react-router-dom'


const ProductScreenCategory = (props) => {
    return (
        <>
    
        <section className="text-gray-600 body-font">
                <div className="container px-2 pt-1 pb-10 mx-auto">
                    <div className="flex flex-col text-center w-full mb-15">
                        <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">Categories</h2>
                    </div>
                    <div className="flex flex-wrap">
                        <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-90">
                            <Link to='/products/category/Clothing'  className='no-underline'><h2 className={"text-lg sm:text-xl" +(props.category === 'Clothing' ? 'text-black': ' text-indigo-500')+" font-medium title-font mb-2 text-center hover:text-black" }>Clothing</h2></Link>
                        </div>
                        <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-90">
                            <Link to='/products/category/Electronics'  className='no-underline'><h2  className={"text-lg sm:text-xl" +(props.category === 'Electronics' ? 'text-black': ' text-indigo-500')+" font-medium title-font mb-2 text-center hover:text-black"}>Electronics</h2></Link>
                        </div>
                        <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-90">
                            <Link to='/products/category/Accessories'  className='no-underline'><h2  className={"text-lg sm:text-xl" +(props.category === 'Accessories' ? 'text-black': ' text-indigo-500')+" font-medium title-font mb-2 text-center hover:text-black"}>Accessories</h2></Link>
                        </div>
                        <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-90">
                            <Link to='/products/category/Shoes'  className='no-underline'><h2  className={"text-lg sm:text-xl" +(props.category === 'Shoes' ? 'text-black': ' text-indigo-500')+" font-medium title-font mb-2 text-center hover:text-black"}>Shoes</h2></Link>
                        </div>
                        <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-90">
                            <Link to='/products/category/Watches'  className='no-underline'><h2  className={"text-lg sm:text-xl" +(props.category === 'Watches' ? 'text-black': ' text-indigo-500')+" font-medium title-font mb-2 text-center hover:text-black"}>Watches</h2></Link>
                        </div>
                        <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-90">
                            <Link to='/products/category/Perfumes'  className='no-underline'><h2  className={"text-lg sm:text-xl" +(props.category === 'Perfumes' ? 'text-black': ' text-indigo-500')+" font-medium title-font mb-2 text-center hover:text-black"}>Perfumes</h2></Link>
                        </div>
                        <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-90">
                            <Link to='/products/category/Books'  className='no-underline'><h2  className={"text-lg sm:text-xl" +(props.category === 'Books' ? 'text-black': ' text-indigo-500')+" font-medium title-font mb-2 text-center hover:text-black"}>Books</h2></Link>
                        </div>
                        <div className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-90">
                            <Link to='#'  className='no-underline disabled'><h2  className={"text-lg sm:text-xl disabled" +(props.category === '' ? 'text-gray-200': ' text-gray-500')+" font-medium title-font mb-2 text-center hover:text-gray"}>Category #8</h2></Link>
                        </div>
                    </div>

                </div>
            </section>
            </>
    )
}

export default ProductScreenCategory
