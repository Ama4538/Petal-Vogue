import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function CustomLink({ to, children, className, dataVisible = null, dataAmount = null }) {
    // Listens to url changes
    const location = useLocation();

    // If url is the same then input span instead of link
    if ((location.pathname === to)) {
        return (
            <span
                className={className}
                data-visible={dataVisible !== null ? dataVisible : undefined}
                data-amount={dataAmount !== null ? dataAmount : undefined}
            >{children}</span>
        )
    } else {
        return (
            <Link
                to={to}
                className={className}
                data-visible={dataVisible !== null ? dataVisible : undefined}
                data-amount={dataAmount !== null ? dataAmount : undefined}
            >{children}</Link>
        )
    }

}

export default CustomLink;