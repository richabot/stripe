import React from 'react'
import {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { listProductCategory, sortProducts} from '../actions/productActions';
import Rating from '../components/Rating';
import Meta from '../components/Meta';
import Paginate from '../components/Paginate';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Breadcrumbs from '../components/Breadcrumbs';
import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'



const HeaderCategoryScreen = ({match}) => {
    const sortOptions = [
  { name: 'Most Popular', href: '#', current: false },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
    ]

    function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
    }
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    const category =match.params.hcategory;
    const csplit = category.split('-',3);
    const pageNumber = match.params.pageNumber || 1;
    const dispatch = useDispatch()
    const productCategory=useSelector(state => state.productCategory)
    const { loading, error, products, page, pages } = productCategory
    console.log(products)


    const setSort=(e)=>{
        dispatch(sortProducts(e.name,pageNumber,category))  
    }
    useEffect(()=>{
        dispatch(listProductCategory(category, pageNumber));
    },[dispatch, category, pageNumber])
    return (
        <>
        <Meta title={category} />
        <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 " onClose={setMobileFiltersOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
            </Transition.Child>
          </Dialog>
        </Transition.Root>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative  flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">{csplit[0]}</h1>

            <div className="flex items-center">
              <Menu as="div" className="z-10 relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z" />
                    </svg>
                   
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name} >
                          {({ active }) => (
                            <button
                              onClick={() => setSort(option)}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900 w-100' : 'text-gray-500 w-100',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </button>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-1 gap-x-8 gap-y-10">
          
              {/* Product grid */}
              <div className="lg:col-span-3">
                  
                <Breadcrumbs bc1={csplit[0]} bc2={csplit[1]} bc3={csplit[2]}/>
                  {loading ? <Loader>Loading...</Loader> : error ? <Message variant='danger'>{error}</Message> :
                <div className="flex flex-wrap -m-4">
                    <div className="max-w-2xl mx-auto py-10 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="mt-1 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {products.map((product) => (
                                <div key={product._id} className="group relative">
                                    <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-center object-cover lg:w-full lg:h-full" />
                                    </div>
                                    <div className="mt-4 flex justify-between">
                                        <div>
                                            <h3 className="text-sm text-gray-700">
                                                <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {product.name}
                                                </Link>
                                            </h3>
                                            <p className="text-sm text-gray-500" style={{marginTop:"-1.2rem"}}>${product.price}</p>
                                            <div style={{marginTop:"-0.7rem"}}>
                                            <Rating value={product.rating} text={product.numReviews} className="mt-1 text-sm text-gray-500" />
                                            </div>
                                        </div>
                                        {/* <p className="text-sm font-medium text-gray-900">{product.price}</p> */}
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                    
                </div>}
                {/* Replace with your content */}
                <Paginate page={page} pages={pages} pageNumber={pageNumber} hcategory={category ? category : ''}></Paginate>
                {/* <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 lg:h-full" /> */}
                {/* /End replace */}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
        
        
        </>
    )
}

export default HeaderCategoryScreen
