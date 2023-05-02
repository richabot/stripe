import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({pages, page, isAdmin=false, category, hcategory}) => {
    return pages>1 && (
        <>
            <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
                <div className="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200">
                    <div className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
                        
                    </div>
                    <div className="flex">
                        {[...Array(pages).keys()].map(i => (
                            <LinkContainer key={i+1} to={!isAdmin ? category ? `/products/category/${category}/page/${i+1}` 
                            : `/products/header/${hcategory}/page/${i+1}`: `/admin/productList/${i+1}`}>
                                <p className="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2">{i+1}</p>
                            </LinkContainer>
                        ))}
                        
                    </div>
                    <div className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
                        
                    </div>
                </div>
            </div>
        </>

    )
}

export default Paginate
