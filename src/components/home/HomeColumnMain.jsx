import { motion } from 'framer-motion';
import { useState } from 'react';
import { debounce } from "lodash"
import HomeColumnBlock from './HomeColumnBlock';

function HomeColumnMain({section}) {
    // State to manage the current scroll position
    const [scrollPosition, setScrollPosition] = useState(0);

    // Handle the scrolling position
    const handleWheel = debounce((event) => {
        let scrollDirection = event.deltaY;
        // Negative = down, Positive = up
        let newScrollPosition = scrollPosition + (scrollDirection > 0 ? -100 : 100)
        // Making sure the newScrollPoisition doesnt exceed boundaries 
        if (newScrollPosition >= -400 && newScrollPosition <= 0) {
            setScrollPosition(newScrollPosition);
        }
    }, 100)

    // Animation for scroll
    const scrollAnimation = {
        scroll: {
            y: `${scrollPosition}%`,
            transition: {
                duration: 0.8,
            }
        },
    }

    return (
        <div className="home__column">
            <motion.div
                className="home__column-inner"
                variants={scrollAnimation}
                animate='scroll'
                onWheel={handleWheel}
            >
                {/* Main Image to transition from loading */}
                <motion.article
                    className="home-column__block"
                    style={{ backgroundImage: `url("./loadingImages/image-1.jpg")` }}
                    layoutId="main-image-1"
                    transition={{
                        duration: 0.75,
                        ease: [0.16, 0.86, 0.64, 0.90]
                    }}
                >
                </motion.article>

                <HomeColumnBlock section = {section} id="image-2" />
                <HomeColumnBlock section = {section} id="image-3" />
                <HomeColumnBlock section = {section} id="image-4" />
                <HomeColumnBlock section = {section} id="image-5" />
            </motion.div>
        </div>
    )
}

export default HomeColumnMain