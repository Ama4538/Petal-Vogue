import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function CustomLink({to, children, className }){
    // Listens to url changes
    const location = useLocation();

    // If url is the same then input span instead of link
    if ((location.pathname === to)) {
        return (
            <span className={className}>{children}</span>
        ) 
    } else {
        return (
            <Link to = {to} className={className}>{children}</Link>
        )
    }

}

export default CustomLink;