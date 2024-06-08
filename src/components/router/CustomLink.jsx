import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function CustomLink({to, children, className }){
    const location = useLocation();

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