import Nav from '../../components/nav/Nav.jsx';
import { motion } from 'framer-motion'

function Search() {

    // Main search Animation
    const searchAnimation = {
        exit: {
            opacity: 0,
            transition: {
                duration: 0.30,
            }
        }
    }

    return (
        <motion.section
            className="search"
            variants={searchAnimation}
            exit = "exit"
        >
            <Nav></Nav>
        </motion.section>
    )
}

export default Search;