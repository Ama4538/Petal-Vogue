import { useState } from "react";
import { motion } from 'framer-motion';
import CustomLink from "../router/CustomLink";

function Nav({ delayTime = 0, transtitionTime = 0, setActiveSection = null, activeSection = "null"}) {
    return (
        <motion.nav
            className="nav"
            layoutId="nav"
            transition={{
                delay: `${delayTime}`,
                duration: `${transtitionTime}`,
                ease: [0.16, 0.86, 0.64, 0.90]
            }}
        >
            <CustomLink to="/home" className="nav__logo" />
            <ul className="nav__list nav__list-button-container">
                {["women", "men", "kid"].map((element, index) => (
                    <li key={index}>
                        <button
                            className='nav__buttons'
                            onClick={() => setActiveSection(element)}
                            data-status={`${activeSection === element ? 'active' : 'inactive'}`}
                        >
                            <p>{element}</p>
                        </button>
                    </li>
                ))}
            </ul>
            <ul className="nav__list nav__list-icon-container">
                <CustomLink to="/search" className="nav__list-icon" />
                <CustomLink to="/home" className="nav__list-icon" />
                <CustomLink to="/home" className="nav__list-icon" />
            </ul>
        </motion.nav >
    )
}

export default Nav