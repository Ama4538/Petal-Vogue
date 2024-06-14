import { useState } from 'react';
import { motion } from 'framer-motion';
import { debounce } from "lodash"
import HomeColumnBlock from './HomeColumnBlock.jsx';

function HomeColumn({ section, data }) {
    // Current Display
    const displayBanners = section === "women" ? data.slice(1) : data;

    // State to manage the current scroll position
    const [scrollPosition, setScrollPosition] = useState(0);

    // variable used to find the max translate value
    const ITEM_SCROLL_HEIGHT = -100;
    const maxScrollPosition = (data.length - 1) * ITEM_SCROLL_HEIGHT;

    // Handle the generation of pagination
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
    }, 100)

    // Animation for scroll
    const scrollAnimation = {
        scroll: {
            y: `${scrollPosition}%`,
            transition: {
                duration: 0.5,
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
                            data-active={`${(scrollPosition / ITEM_SCROLL_HEIGHT) === index ? "active" : "inactive"}`}
                        ></li>
                    )
                })}
            </ul>

            {/* Column */}
            <motion.div
                className="home-column__slider"
                variants={scrollAnimation}
                animate='scroll'
                onWheel={handleWheel}
            >
                {section === "women" ?
                // Main block used for transtion
                    <motion.article
                        className="home-column__block"
                        style={{ backgroundImage: `url("/homeimage/women/home-women-background-image-1.jpg")` }}
                        layoutId="main-image-1"
                        transition={{
                            duration: 0.75,
                            ease: [0.16, 0.86, 0.64, 0.90]
                        }}
                    >
                        {/* Handle data for the main block */}
                        <div className="home-column__text-container" >
                            {/* Add if data exist */}
                            {(data[0].title !== null && data[0].subtitle !== null) && <h1 className="home-column__text home-column__text-title">{data[0].title} <br /> {data[0].subtitle}</h1>}
                            {((data[0].title !== null && data[0].subtitle === null)) && <h1 className="home-column__text home-column__text-title">{data[0].title}</h1>}
                            {(data[0].statement !== null) && <h2 className="home-column__text home-column__text-statement">{data[0].statement}</h2>}
                        </div>
                    </motion.article> : null
                }

                {/* Generate blocks within the column */}
                {displayBanners.map((element, index) => {
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