import { useState } from 'react';
import { motion } from 'framer-motion'
import HomeColumnMain from '../components/home/HomeColumnMain.jsx';
import HomeColumn from '../components/home/HomeColumn.jsx';
import HomeNav from '../components/nav/HomeNav.jsx';

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
    }

    return (
        <section className="home">
            <HomeNav setSectionLocation = {setSectionLocation}></HomeNav>
            <motion.div 
                className='home__row'
                variants={homeAnimation}
                animate="swipe"
            >
                <HomeColumnMain section="women" data={home.women} />
                <HomeColumn section="men" data={home.men} />
                <HomeColumn section="kid" data={home.kid} />
            </motion.div>

        </section>
    )
}

export default Home;