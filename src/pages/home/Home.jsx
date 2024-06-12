import { useState } from 'react';
import { motion } from 'framer-motion'
import HomeColumnMain from "./HomeColumnMain.jsx"
import HomeColumn from './HomeColumn.jsx';
import Nav from '../../components/nav/Nav.jsx';

function Home({ home, initalState = "women", cartAmount }) {
    // State used to manage active section
    const [activeSection, setActiveSection] = useState(initalState);

    // The swipe value
    const BLOCK_SWIPE_LENGTH = -100;

    // Translate value of each section
    const sectionTranslateValue = {
        women: 0,
        men: 1 * BLOCK_SWIPE_LENGTH,
        kid: 2 * BLOCK_SWIPE_LENGTH,
    }

    // Animation for switching home section
    const homeAnimation = {
        swipe: {
            x: `${sectionTranslateValue[activeSection]}%`,
            transition: {
                duration: 0.5,
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.15,
            }
        }
    }

    return (
        <motion.section
            className="home"
            variants={homeAnimation}
            exit="exit"
        >
            <Nav
                setActiveSection={setActiveSection}
                activeSection={activeSection}
                cartAmount={cartAmount} />
            <motion.div
                className='home__row'
                variants={homeAnimation}
                animate="swipe"
            >
                <HomeColumnMain section="women" data={home.women} />
                <HomeColumn section="men" data={home.men} />
                <HomeColumn section="kid" data={home.kid} />
            </motion.div>

        </motion.section>
    )
}

export default Home;