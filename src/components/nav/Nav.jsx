import { useState } from "react";
import { motion } from 'framer-motion';
import CustomLink from "../router/CustomLink";

function Nav({ delayTime = 0, transtitionTime = 0, setSectionLocation }) {
    // States used to manage the current column in view
    const [activeSection, setActiveSection] = useState(0);

    // onClick event handler
    function handleClick(section) {
        switch (section) {
            case "women":
                // Changes states based on which buttom is pressed
                setActiveSection(0);
                setSectionLocation(0);
                break;
            case "men":
                setActiveSection(1);
                setSectionLocation(-100);
                break;
            case "kid":
                setActiveSection(2);
                setSectionLocation(-200);
                break;
        }
    }

    return (
        <motion.nav
            className="nav"
            layoutId = "Test"
            transition={{
                delay: `${delayTime}`,
                duration: `${transtitionTime}`,
                ease: [0.16, 0.86, 0.64, 0.90]
            }}
        >
            <CustomLink to="/home" className="nav__logo" />
            <ul className="nav__list nav__list-button-container">
                <li>
                    <button
                        className="nav__buttons"
                        onClick={() => { handleClick("women") }}
                        data-activestatus={`${activeSection === 0 ? 'active' : 'inactive'}`}
                    ><p>Women</p></button>
                </li>
                <li>
                    <button
                        className="nav__buttons"
                        onClick={() => { handleClick("men") }}
                        data-activestatus={`${activeSection === 1 ? 'active' : 'inactive'}`}
                    ><p>Men</p></button>
                </li>
                <li>
                    <button
                        className="nav__buttons"
                        onClick={() => { handleClick("kid") }}
                        data-activestatus={`${activeSection === 2 ? 'active' : 'inactive'}`}
                    ><p>Kid</p></button>
                </li>
            </ul>
            <ul className="nav__list nav__list-icon-container">
                <CustomLink to="/search" className="nav__list-icon" />
                <CustomLink to="/home" className="nav__list-icon" />
                <CustomLink to="/home" className="nav__list-icon" />
            </ul>
        </motion.nav>
    )
}

export default Nav