import { motion } from "framer-motion"
import SearchNav from "../../components/nav/SearchNav";
import CustomLink from "../../components/router/CustomLink";

function Error() {
    // Main error animation
    const errorAnimation = {
        exit: {
            opacity: 0,
            transition: {
                duration: 0.15,
            }
        }
    }

    return (
        <motion.section
            className="error"
            variants={errorAnimation}
            exit="exit"
        >
            <SearchNav />
            <article className="error__container">
                <h2 className="error__title">Sorry</h2>
                <h3 className="error__subtitle">We Couldn't Find That Page</h3>
                <p className="error__text">Try searching again or go to our <CustomLink to="/home" >home page</CustomLink></p>
            </article>
        </motion.section>
    )
}

export default Error;