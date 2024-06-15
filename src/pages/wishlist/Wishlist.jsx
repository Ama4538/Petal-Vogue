import { motion } from "framer-motion"
import SearchNav from "../../components/nav/SearchNav";


function Wishlist() {

    // Main Wishlist Animation
    const wishListAnimation = {
        exit: {
            opacity: 0,
            transition: {
                duration: 0.15,
            }
        }
    }

    return (
        <motion.section
            className="wishlist"
            variants={wishListAnimation}
            exit="exit"
        >
            <SearchNav />
        </motion.section>
    )
}

export default Wishlist