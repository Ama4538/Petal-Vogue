import { useState } from "react";
import { Link } from "react-router-dom"
import { delay, motion } from 'framer-motion';

function Nav({ setSectionLocation }) {
    const [activeSection, setActiveSection] = useState(0);

    function handleClick(section) {
        switch (section) {
            case "women":
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

    const navAnimationMain = {
        initial: {
            y: -200
        },
        show: {
            y: 0,
            transition: {
                delay: 0.40,
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
            <ul className="home-nav__list home-nav__list-button-wrapper">
                <li>
                    <button
                        className="home-nav__buttons"
                        onClick={() => { handleClick("women") }}
                        data-activeStatus={`${activeSection === 0 ? 'active' : 'inactive'}`}
                    ><p>Women</p></button>
                </li>
                <li>
                    <button
                        className="home-nav__buttons"
                        onClick={() => { handleClick("men") }}
                        data-activeStatus={`${activeSection === 1 ? 'active' : 'inactive'}`}
                    ><p>Men</p></button>
                </li>
                <li>
                    <button
                        className="home-nav__buttons"
                        onClick={() => { handleClick("kid") }}
                        data-activeStatus={`${activeSection === 2 ? 'active' : 'inactive'}`}
                    ><p>Kid</p></button>
                </li>
            </ul>
            <ul className="home-nav__list home-nav__list-icon-wrapper">
                <Link to="/home" className="home-nav__list-icon" ></Link>
                <Link to="/home" className="home-nav__list-icon" ></Link>
                <Link to="/home" className="home-nav__list-icon" ></Link>
            </ul>
        </motion.nav>
    )
}

export default Nav