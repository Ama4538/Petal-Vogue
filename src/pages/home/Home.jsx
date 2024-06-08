import { useState } from 'react';
import { motion } from 'framer-motion'
import HomeColumnMain from "./HomeColumnMain.jsx"
import HomeColumn from './HomeColumn.jsx';
import HomeNav from './HomeNav.jsx';

function Home({ home }) {
    const [sectionLocation, setSectionLocation] = useState(0);

    // Animation for switching home section
    const homeAnimation = {
        swipe: {
            x: `${sectionLocation}%`,
            transition: {
                duration: 0.65,
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.25,
            }
        }
    }

    return (
        <motion.section
            className="home"
            variants={homeAnimation}
            exit = "exit"
        >
            <HomeNav setSectionLocation={setSectionLocation}></HomeNav>
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