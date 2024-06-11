import { useState } from "react";
import { motion } from 'framer-motion';
import CustomLink from "../router/CustomLink";

function Nav({ delayTime = 0, transtitionTime = 0, setActiveSection }) {
    // States used to manage the current column in view
    const [activeTab, setActiveTab] = useState("women");

    // onClick event handler
    function handleClick(section) {
        setActiveTab(section);
        setActiveSection(section);
    }

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
                    <li>
                        <button
                            key={index}
                            className='nav__buttons'
                            onClick={() => handleClick(element)}
                            data-status={`${activeTab === element ? 'active' : 'inactive'}`}
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