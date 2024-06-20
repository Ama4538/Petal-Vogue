import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import { home, reviews } from "../../data/data.json"
import Loader from "../../pages/loader/Loader.jsx"
import Home from "../../pages/home/Home.jsx";
import Search from "../../pages/search/Search.jsx";
import Error from "../../pages/error/Error.jsx";
import Cart from "../../pages/cart/Cart.jsx";
import Wishlist from "../../pages/wishlist/Wishlist.jsx";
import ProductPage from "../../pages/product-page/ProductPage.jsx";

function AnimatedRoutes() {
    // Listens to url changes
    const location = useLocation();

    return (
        // Wraps Routes in AnimatePresence to enable exit animations
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.key}>
                <Route path="/" element={<Loader />} />
                <Route path="/home" element={<Home home={home} />} />
                <Route path="/search" element={<Search />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/product/:productID" element={<ProductPage reviews = {reviews} />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes;