import React from 'react'

const SearchBox = ({history}) => {
    const [keyword, setKeyword] = React.useState('')
    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/search/${keyword}`)
        }else{
            history.push('/')
        }
       
    }
    return (
        <>
        <form onSubmit={submitHandler} inline>
            <div className="flex items-center justify-center">
            <div className="flex border-2 rounded">
                <input type="text" className="px-4 py-2 w-80 lg:block hidden" placeholder="Search Products ..." name="q" value={keyword} onChange={(e)=>setKeyword(e.target.value)} />
                <button type="submit" className="flex items-center justify-center px-4  lg:block hidden text-white">
                    <svg className="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path
                            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                    </svg>
                </button>
            </div>
        </div>

        </form>
       
    </>
    )
}

export default SearchBox
