import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react";
import Home from "./pages/Home";
import Loader from "./components/Loader/Loader.jsx"

function App() {
    // The state of the loading animation
    const [loading, setLoading] = useState(true);

    return (
        // AnimatePresence for exit animation
        <AnimatePresence>
            {loading ? (
                // Required by Animation Presence 
                <motion.div key="loader">
                    <Loader setLoading={setLoading}></Loader>
                </motion.div>
            ) : (
                <Home></Home>
            )}
        </AnimatePresence>
    )
}

export default App;