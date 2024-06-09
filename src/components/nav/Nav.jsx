import { useState } from "react";
import { motion } from 'framer-motion';
import CustomLink from "../router/CustomLink";

function Nav({ delayTime = 0, transtitionTime = 0, setActiveSection }) {
    // States used to manage the current column in view
    const [activeTab, setActiveTab] = useState(0);

    // onClick event handler
    function handleClick(section) {
        switch (section) {
            case "women":
                // Changes states based on which buttom is pressed
                setActiveTab(0);
                setActiveSection(0);
                break;
            case "men":
                setActiveTab(1);
                setActiveSection(1);
                break;
            case "kid":
                setActiveTab(2);
                setActiveSection(2);
                break;
        }
    }

    return (
        <motion.nav
            className="nav"
            layoutId = "nav"
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
                        data-activestatus={`${activeTab === 0 ? 'active' : 'inactive'}`}
                    ><p>Women</p></button>
                </li>
                <li>
                    <button
                        className="nav__buttons"
                        onClick={() => { handleClick("men") }}
                        data-activestatus={`${activeTab === 1 ? 'active' : 'inactive'}`}
                    ><p>Men</p></button>
                </li>
                <li>
                    <button
                        className="nav__buttons"
                        onClick={() => { handleClick("kid") }}
                        data-activestatus={`${activeTab === 2 ? 'active' : 'inactive'}`}
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