import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react";
import Home from "./pages/Home";
import Loader from "./components/loader/Loader.jsx"

function App() {
    // The state of the loading animation
    const [loading, setLoading] = useState(true);

    return (
        // AnimatePresence for exit animation
        <AnimatePresence>
            {loading ? (
                // Wrapper div with key for AnimatePresence
                <motion.div key = "loader">
                    <Loader setLoading={setLoading} />
                </motion.div>
            ) : (
                <Home />
            )}
        </AnimatePresence>
    )
}

export default App;