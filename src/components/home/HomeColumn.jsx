import { useState } from 'react';
import { motion } from 'framer-motion';
import { debounce } from "lodash"
import HomeColumnBlock from './HomeColumnBlock.jsx';

function HomeColumn({ section, data }) {
    // State to manage the current scroll position
    const [scrollPosition, setScrollPosition] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);

    // variable used to find the max translate value
    const ITEM_SCROLL_HEIGHT = -100;
    const maxScrollPosition = (data.length - 1) * ITEM_SCROLL_HEIGHT;

    // Handle the generation of pagination
    const maxIndex = (data.length - 1);
    const paginationArray = Array.from({ length: data.length })

    // Handle the scrolling animation
    const handleWheel = debounce((event) => {
        let scrollDirection = event.deltaY;

        // Handle the movement translation value
        let newScrollPosition = scrollPosition + (scrollDirection > 0 ? ITEM_SCROLL_HEIGHT : (ITEM_SCROLL_HEIGHT * -1))
        // Making sure the newScrollPoisition doesnt exceed boundaries 
        if (newScrollPosition >= maxScrollPosition && newScrollPosition <= 0) {
            setScrollPosition(newScrollPosition);
        }

        // Handle the pagination index
        let newIndex = currentIndex + (scrollDirection > 0 ? 1 : -1)
        if (newIndex <= maxIndex && newIndex >= 0) {
            setCurrentIndex(newIndex);
        }

    }, 100)

    // Animation for scroll
    const scrollAnimation = {
        scroll: {
            y: `${scrollPosition}%`,
            transition: {
                duration: 0.65,
            }
        },
    }

    return (
        <div className="home__column">
            <ul className="home-column__pagination-container">
                {/* Generating pagination based on amount of data */}
                {paginationArray.map((____, index) => {
                    return (
                        <li
                            key={index}
                            className="home-column__pagination"
                            data-active={`${currentIndex === index ? "active" : "inactive"}`}
                        ></li>
                    )
                })}
            </ul>
            <motion.div
                className="home-column__slider"
                variants={scrollAnimation}
                animate='scroll'
                onWheel={handleWheel}
            >
                {/* Generate blocks within the column */}
                {data.map((element, index) => {
                    return (
                        <HomeColumnBlock
                            key={index}
                            section={section}
                            data={element}
                        />
                    )
                })}
            </motion.div>
        </div>
    )
}

export default HomeColumn