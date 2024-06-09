import { useState } from 'react';
import SearchNav from '../../components/nav/SearchNav.jsx';
import { motion } from 'framer-motion'
import Product from './Product.jsx';

function Search({ product }) {
    // State used to manage current section
    const [activeSection, setActiveSection] = useState("women");
    // State used to manage the current display of content
    const [currentDisplay, setCurrentDisplay] = useState(product.women)
    
    // Handles the section changes
    function handleClick(section) {
        switch (section) {
            // Change states based on which buttom is pressed
            case "women":
                setActiveSection("women");
                setCurrentDisplay(product.women);
                break;
            case "men":
                setActiveSection("men");
                setCurrentDisplay(product.men);
                break;
            case "kid":
                setActiveSection("kid");
                setCurrentDisplay(product.kid);
                break;
        }
    }

    // Main search Animation
    const searchAnimation = {
        exit: {
            opacity: 0,
            transition: {
                duration: 0.30,
            }
        }
    }

    return (
        <motion.section
            className="search"
            variants={searchAnimation}
            exit="exit"
        >
            <SearchNav />
            <div className='search__banner-container'>
                <div className="search__banner" style={{ backgroundImage: `url("./bannerImage/${activeSection}-banner.jpg")` }} >
                    <div className="search-banner__text-container">
                        {activeSection === 'women' && (
                            <>
                            <h2 className='search-banner__text-title'>Fashion Finds a New Arc</h2>
                            <h3 className='search-banner__text-subtitle'>A Glimpse Into Modern</h3>
                            </>
                        )} 
                        {activeSection === 'men' && (
                            <>
                            <h2 className='search-banner__text-title'>Style Redefined</h2>
                            <h3 className='search-banner__text-subtitle'>Crafting Confidence in Every Thread</h3>
                            </>
                        )} 
                        {activeSection === 'kid' && (
                            <>
                            <h2 className='search-banner__text-title'>Fashionable Futures Begin Here</h2>
                            <h3 className='search-banner__text-subtitle'>Discovering the Next Generation of Style Icons</h3>
                            </>
                        )} 
                    </div>
                </div>
            </div>

            {/* Change Section Buttons */}
            <ul className='search__section-selector'>
                <button
                    className='search__section-button'
                    onClick={() => handleClick('women')}
                    data-activestatus={`${activeSection === 'women' ? 'active' : 'inactive'}`}
                >Women</button>
                <button
                    className='search__section-button'
                    onClick={() => handleClick('men')}
                    data-activestatus={`${activeSection === 'men' ? 'active' : 'inactive'}`}
                >Men</button>
                <button
                    className='search__section-button'
                    onClick={() => handleClick('kid')}
                    data-activestatus={`${activeSection === 'kid' ? 'active' : 'inactive'}`}
                >Kid</button>
            </ul>

            {/* Main Content */}
            <section className='search__content'>
                <h3 className='search-header__title'>{activeSection}</h3>
                <article className='search-content__main'>
                    {/* Populate the display area */}
                    {currentDisplay.map((element, index) => {
                        return (<Product
                            sectionTitle={activeSection}
                            name={element.name}
                            price={element.price}
                            description = {element.description}
                            rating = {element.rating}
                            review = {element.review}
                            image={element.image}
                            key={index}
                        />)
                    })}
                </article>
            </section>
        </motion.section>
    )
}

export default Search;