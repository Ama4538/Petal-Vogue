import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import { home } from "../../data/data.json"
import Loader from "../../pages/Loader.jsx"
import Home from "../../pages/Home.jsx";
import Search from "../../pages/Search.jsx";

function AnimatedRoutes() {
    // Listens to url changes
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.key}>
                <Route path="/" element={<Loader />} />
                <Route path="/home" element={<Home home={home} />} />
                <Route path="/search" element={<Search />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes;