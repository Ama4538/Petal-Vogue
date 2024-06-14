import React, { createContext, useEffect, useState } from 'react';
import { product } from '../../data/product.json';

export const AppContext = createContext();
function AppProvider({ children }) {
        // State used to manage the products status
        const productArray = [].concat(...Object.values(product));
        const [allProducts, setAllProducts] = useState(productArray.map(product => ({
            ...product,
            // Status of the button
            status: "enabled",
        })));
        
        // Manage the search state for the searchNav
        const [searched, setSearched] = useState("")

        // State used for manage cart
        const [cartInventory, setCartInventory] = useState([])
        
    return (
        <AppContext.Provider value = {{
            allProducts,
            setAllProducts,
            searched,
            setSearched,
            cartInventory,
            setCartInventory
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider