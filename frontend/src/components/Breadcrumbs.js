import React from 'react'

const Breadcrumbs = (props) => {

    return (
        <nav className="flex" aria-label="Breadcrumb">
  <ol className="inline-flex items-center space-x-1 md:space-x-3">
      
    <li className="inline-flex items-center">
      <a href="/" className="text-gray-700 hover:text-gray-900 inline-flex items-center">
        <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
        Home
      </a>
    </li>
    
    {props.bc1 ? props.bc2 ? props.bc3 ? 
    
    <><li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                {props.bc2 ? <a href={`/products/header/${props.bc1}`} className="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium">{props.bc1}</a> : <span className="text-gray-400 ml-1 md:ml-2 text-sm font-medium">{props.bc1}</span>}
              </div>
            </li><li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                {props.bc2 ? <a href={`/products/header/${props.bc1}-${props.bc2}`} className="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium">{props.bc2}</a> : <span className="text-gray-400 ml-1 md:ml-2 text-sm font-medium">{props.bc2}</span>}
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  <span className="text-gray-400 ml-1 md:ml-2 text-sm font-medium">{props.bc3}</span>
                </div>
              </li></> 
    :
     
    <><li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                {props.bc2 ? <a href={`/products/header/${props.bc1}`} className="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium">{props.bc1}</a> : <span className="text-gray-400 ml-1 md:ml-2 text-sm font-medium">{props.bc1}</span>}
              </div>
            </li><li aria-current="page">
                <div className="flex items-center">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                  <span className="text-gray-400 ml-1 md:ml-2 text-sm font-medium">{props.bc2}</span>
                </div>
              </li></> 
    
    : 
    <li>
      <div className="flex items-center">
        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
        {props.bc2 ? <a href={`/products/header/${props.bc1}`} className="text-gray-700 hover:text-gray-900 ml-1 md:ml-2 text-sm font-medium">{props.bc1}</a> : <span className="text-gray-400 ml-1 md:ml-2 text-sm font-medium">{props.bc1}</span>}
      </div>
    </li>
     : null}
    
  </ol>
</nav>
    )
}

export default Breadcrumbs
