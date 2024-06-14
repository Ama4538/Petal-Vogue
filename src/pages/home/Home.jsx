import { useState } from 'react';
import { motion } from 'framer-motion'
import HomeColumn from './HomeColumn.jsx';
import Nav from '../../components/nav/Nav.jsx';

function Home({ home }) {
    // State used to manage active section
    const [activeSection, setActiveSection] = useState("women");

    // The swipe value
    const BLOCK_SWIPE_LENGTH = -100;

    // Translate value of each section
    const sectionTranslateValue = {
        women: 0,
        men: 1 * BLOCK_SWIPE_LENGTH,
        kids: 2 * BLOCK_SWIPE_LENGTH,
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

    // Handle the change of section
    function handleActiveSection(data) {
        setActiveSection(data);
    }

    return (
        <motion.section
            className="home"
            variants={homeAnimation}
            exit="exit"
        >
            <Nav handleActiveSection={handleActiveSection} activeSection={activeSection} />
            <motion.div
                className='home__row'
                variants={homeAnimation}
                animate="swipe"
            >
                <HomeColumn section="women" data={home.women} />
                <HomeColumn section="men" data={home.men} />
                <HomeColumn section="kids" data={home.kids} />
            </motion.div>

        </motion.section>
    )
}

export default Home;