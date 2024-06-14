import React, { createContext, useEffect, useState } from 'react';
import { product } from '../../data/product.json';
import SecondaryLoader from '../../pages/loader/SecondaryLoader';

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

    // Check if data is loaded
    const [dataLoaded, setDataLoaded] = useState(false)

    // load from localStorage on initial mount
    useEffect(() => {
        const currentCart = localStorage.getItem("currentCart");
        if (currentCart !== null) {
            try {
                // Parse and set cartInventory state
                const parseCart = JSON.parse(currentCart);
                setCartInventory(parseCart);

                // Update our product status based upon old cart
                parseCart.forEach(product => {
                    setAllProducts(prevProducts =>
                        prevProducts.map(prevProduct =>
                            prevProduct.name === product.name
                                ? { ...prevProduct, status: 'disabled' }
                                : prevProduct
                        )
                    );
                });
                // Updata loaded state
                setDataLoaded(true);
            } catch (error) {
                console.error("Error parsing currentCart:", error);
            }
        } else {
            // If no data exists in localStorage, initialize with empty array
            localStorage.setItem("currentCart", JSON.stringify([]));
        }
    }, []);

    // Add data into storage
    useEffect(() => {
        if (dataLoaded) {
            localStorage.setItem("currentCart", JSON.stringify(cartInventory));
        }
    }, [cartInventory])

    return (
        <AppContext.Provider value={{
            allProducts,
            setAllProducts,
            searched,
            setSearched,
            cartInventory,
            setCartInventory,
        }}>
            {dataLoaded ? [children] : <SecondaryLoader />}
        </AppContext.Provider>
    )
}

export default AppProvider