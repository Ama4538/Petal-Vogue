import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"
import { home } from "./data.json"
import Loader from "./components/loader/Loader.jsx"
import Home from "./pages/Home";

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
                <Home home = {home}/>
            )}
        </AnimatePresence>
    )
}

export default App;