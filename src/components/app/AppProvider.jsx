import React, { createContext, useEffect, useState } from 'react';
import { product } from '../../data/product.json';
import SecondaryLoader from '../../pages/loader/SecondaryLoader';

export const AppContext = createContext();
function AppProvider({ children }) {
    // State used to manage the products status
    const productArray = [].concat(...Object.values(product));
    const [allProducts, setAllProducts] = useState(productArray)
    // Manage the search state for the searchNav
    const [searched, setSearched] = useState("")

    // State used to manage cart
    const [cartInventory, setCartInventory] = useState([])

    // State used to manage wishlist
    const [wishlistInventory, setWishlistInventory] = useState([])

    // Check if data is loaded
    const [cartDataLoaded, setCartDataLoaded] = useState(false)
    const [wishlistDataLoaded, setWishlistDataLoaded] = useState(false)

    // load from localStorage on initial mount
    useEffect(() => {
        const currentCart = localStorage.getItem("currentCart");
        const currentwishlist = localStorage.getItem("currentwishlist");

        // Checking and loading cart data
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
                // Update loaded state
                setCartDataLoaded(true);
            } catch (error) {
                console.error("Error parsing currentCart:", error);
            }
        } else {
            // If no data exists in localStorage, initialize with empty array
            localStorage.setItem("currentCart", JSON.stringify([]));
            setCartDataLoaded(true);
        }

        // Checking and loading wishlistInventory data
        if (currentwishlist !== null) {
            try {
                // Parse and set wishlist state
                const parsewishlist = JSON.parse(currentwishlist);
                setWishlistInventory(parsewishlist)

                // Update our product status based upon old wishlist inventory
                parsewishlist.forEach(product => {
                    setAllProducts(prevProducts =>
                        prevProducts.map(prevProduct =>
                            prevProduct.name === product.name
                                ? { ...prevProduct, wishlist: true }
                                : prevProduct
                        )
                    );
                });
                // Update loaded state
                setWishlistDataLoaded(true);
            } catch (error) {
                console.error("Error parsing currentwishlist:", error);
            }
        } else {
            // If no data exists in localStorage, initialize with empty array
            localStorage.setItem("currentwishlist", JSON.stringify([]))
            setWishlistDataLoaded(true);
        }

    }, []);
    
    // Add cart into storage
    useEffect(() => {
        if (cartDataLoaded) {
            localStorage.setItem("currentCart", JSON.stringify(cartInventory));
        } 
    }, [cartInventory])

    // Add wishlist into storage
    useEffect(() => {
        if (wishlistDataLoaded) {
            localStorage.setItem("currentwishlist", JSON.stringify(wishlistInventory))
        }
    }, [wishlistInventory])

    return (
        <AppContext.Provider value={{
            allProducts,
            setAllProducts,
            searched,
            setSearched,
            cartInventory,
            setCartInventory,
            wishlistInventory,
            setWishlistInventory
        }}>
            {cartDataLoaded && wishlistDataLoaded ? [children] : <SecondaryLoader />}
        </AppContext.Provider>
    )
}

export default AppProvider