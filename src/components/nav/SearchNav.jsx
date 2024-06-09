import { motion } from 'framer-motion';
import CustomLink from "../router/CustomLink";

function SearchNav() {

    return (
        <motion.nav
            className="nav"
            layoutId="nav"
        >
            <CustomLink to="/home" className="nav__logo" />
            <div className='nav__search-container'>
                <input className='nav__search' type="text" placeholder='Search by keyword'/>
            </div>
            <ul className="nav__list nav__list-icon-container">
                <CustomLink to="/search" className="nav__list-icon" />
                <CustomLink to="/home" className="nav__list-icon" />
                <CustomLink to="/home" className="nav__list-icon" />
            </ul>
        </motion.nav>
    )
}

export default SearchNav