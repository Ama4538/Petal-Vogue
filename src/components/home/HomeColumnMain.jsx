import { useState } from 'react';
import { motion } from 'framer-motion';
import { debounce } from "lodash"
import HomeColumnBlock from './HomeColumnBlock.jsx';

function HomeColumnMain({ section, data }) {
    // State to manage the current scroll position
    const [scrollPosition, setScrollPosition] = useState(0);

    // variable used to find the max translate value
    const ITEM_SCROLL_HEIGHT = -100;
    const maxScrollPosition = (data.length - 1) * ITEM_SCROLL_HEIGHT;

    // Handle the scrolling position
    const handleWheel = debounce((event) => {
        let scrollDirection = event.deltaY;
        let newScrollPosition = scrollPosition + (scrollDirection > 0 ? ITEM_SCROLL_HEIGHT : (ITEM_SCROLL_HEIGHT * -1))
        // Making sure the newScrollPoisition doesnt exceed boundaries 
        if (newScrollPosition >= maxScrollPosition && newScrollPosition <= 0) {
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
        <motion.div
            className="home__column"
            variants={scrollAnimation}
            animate='scroll'
            onWheel={handleWheel}
        >
            {/* Main image to transition from loading */}
            <motion.article
                className="home-column__block"
                style={{ backgroundImage: `url("/homeimage/women/home-women-background-image-1.jpg")` }}
                layoutId="main-image-1"
                transition={{
                    duration: 0.75,
                    ease: [0.16, 0.86, 0.64, 0.90]
                }}
            >
            </motion.article>

            {/* Generate blocks within the column except the first */}
            {data.slice(1).map((element, index) => {
                return (
                    <HomeColumnBlock
                        key={index}
                        section={section}
                        id={element.file}
                    />
                )
            })}
        </motion.div>
    )
}

export default HomeColumnMain