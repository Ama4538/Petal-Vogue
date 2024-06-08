import { useState } from "react";
import { Link } from "react-router-dom"
import { motion } from 'framer-motion';

function Nav({ setSectionLocation }) {
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

    // Main nav animation
    const navAnimationMain = {
        initial: {
            y: -200
        },
        show: {
            y: 0,
            transition: {
                delay: 0.20,
                duration: 1.25,
                ease: [0.16, 0.86, 0.64, 0.90]
            }
        }
    }

    return (
        <motion.nav
            className="home-nav"
            variants={navAnimationMain}
            initial="initial"
            animate="show"
        >
            <Link to="/home" className="home-nav__logo" href=""></Link>
            <ul className="home-nav__list home-nav__list-button-container">
                <li>
                    <button
                        className="home-nav__buttons"
                        onClick={() => { handleClick("women") }}
                        data-activestatus={`${activeSection === 0 ? 'active' : 'inactive'}`}
                    ><p>Women</p></button>
                </li>
                <li>
                    <button
                        className="home-nav__buttons"
                        onClick={() => { handleClick("men") }}
                        data-activestatus={`${activeSection === 1 ? 'active' : 'inactive'}`}
                    ><p>Men</p></button>
                </li>
                <li>
                    <button
                        className="home-nav__buttons"
                        onClick={() => { handleClick("kid") }}
                        data-activestatus={`${activeSection === 2 ? 'active' : 'inactive'}`}
                    ><p>Kid</p></button>
                </li>
            </ul>
            <ul className="home-nav__list home-nav__list-icon-container">
                <Link to="/search" className="home-nav__list-icon" ></Link>
                <Link to="/home" className="home-nav__list-icon" ></Link>
                <Link to="/home" className="home-nav__list-icon" ></Link>
            </ul>
        </motion.nav>
    )
}

export default Nav