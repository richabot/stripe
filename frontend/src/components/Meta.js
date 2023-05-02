import React from 'react'
import {Helmet} from 'react-helmet';
const Meta = ({title, description}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} /> 
        </Helmet>
    )
}

Meta.defaultProps = {
    title: 'Welcome To Proshop',
    description: 'Proshop is a react application for shopping'
}

export default Meta
