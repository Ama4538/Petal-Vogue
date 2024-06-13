import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import { home } from "../../data/data.json"
import { product } from "../../data/product.json"
import Loader from "../../pages/loader/Loader.jsx"
import Home from "../../pages/home/Home.jsx";
import Search from "../../pages/search/Search.jsx";
import Error from "../../pages/error/Error.jsx";
import Cart from "../../pages/cart/Cart.jsx";


function AnimatedRoutes() {
    // Listens to url changes
    const location = useLocation();

    // Manage the search state for the searchNav
    const [searched, setSearched] = useState("")

    // State used to manage the products status
    const productArray = [].concat(...Object.values(product));
    const [allProducts, setAllProducts] = useState(productArray.map(element => ({
        ...element,
        // Status of the button
        status: "enabled",
    })));

    // Manage cart
    const [cartInventory, setCartInventory] = useState([])

    useEffect(() => {
        console.log(cartInventory);
    }, [cartInventory])

    return (
        // Wraps Routes in AnimatePresence to enable exit animations
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.key}>
                <Route path="/" element={<Loader />} />
                <Route
                    path="/home"
                    element={<Home
                        home={home}
                        cartAmount={cartInventory.length}
                    />}
                />
                <Route path="/search"
                    element={<Search
                        setCartInventory={setCartInventory}
                        cartAmount={cartInventory.length}
                        allProducts={allProducts}
                        setAllProducts={setAllProducts}
                        searched={searched}
                        setSearched={setSearched}
                    />}
                />
                <Route
                    path="/cart"
                    element={<Cart
                        cartInventory={cartInventory}
                        allProducts={allProducts}
                        setSearched={setSearched}
                    />}
                />
                <Route
                    path="*"
                    element={<Error
                        cartAmount={cartInventory.length}
                        allProducts={allProducts}
                        setSearched={setSearched}
                    />}
                />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes;