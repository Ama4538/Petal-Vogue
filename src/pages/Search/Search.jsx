import { useState } from 'react';
import SearchNav from '../../components/nav/SearchNav.jsx';
import { motion } from 'framer-motion'
import Product from './Product.jsx';
import DropDown from './DropDown.jsx';
import Marquee from './Marquee.jsx';

function Search({ product }) {
    // State used to manage current section
    const [activeSection, setActiveSection] = useState("women");
    // State used to manage the current display of content
    const [currentDisplay, setCurrentDisplay] = useState(product.women)

    // Banner text for each section
    const bannerText = {
        women: ["Fashion Finds a New Arc", "A Glimpse Into Modern"],
        men: ["Style Redefined", "Crafting Confidence in Every Thread"],
        kid: ["Fashionable Futures Begin Here", "Discovering the Next Generation of Style Icons"],
    }

    // Filter for each section
    const catergoryFilter = {
        women: ["All", "Sunglasses", "Bikinis", "T-shirts", "Tank Tops", "Sweaters"],
        men: ["All", "Hoodies", "Hats", "Rain Coats", "Shirts", "Jackets"],
        kid: ["All", "Shorts", "Jackets", "Swimwears", "Sweaters", "Crop Tops"],
    }
    // Sort by preference
    const sortByFilter = ["Relevance", "Low to High", "High to Low"]

    // Marquee text for each section
    const marqueeText = {
        women: "Flash Sale: Up to 50% Off All Womens Fashion at Checkout",
        men: "Flash Sale: Up to 30% Off All mens Fashion at Checkout",
        kid: "Flash Sale: Up to 25% Off All kids Fashion at Checkout",
    }

    // Handles the section changes
    function handleClick(section) {
        setActiveSection(section);
        setCurrentDisplay(product[section]);
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
                        <h2 className='search-banner__text-title'>{bannerText[activeSection][0]}</h2>
                        <h3 className='search-banner__text-subtitle'>{bannerText[activeSection][1]}</h3>
                    </div>
                </div>
            </div>

            {/* Change Section Buttons */}
            <ul className='search__section-selector'>
                {["women", "men", "kid"].map((section) => (
                    <button
                        key={section}
                        className='search__section-button'
                        onClick={() => handleClick(section)}
                        data-activestatus={activeSection === section ? 'active' : 'inactive'}
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                ))}
            </ul>

            {/* Filters */}
            <div className="search-content__filter-container">
                <div className="search-content-dropdown-container">
                    <p className="search-dropdown__title">Catergory:</p>
                    <DropDown content={catergoryFilter[activeSection]}></DropDown>
                </div>
                <Marquee text={marqueeText[activeSection]}></Marquee>
                <div className="search-content-dropdown-container">
                    <p className="search-dropdown__title">Sort By:</p>
                    <DropDown content={sortByFilter}></DropDown>
                </div>
            </div>

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
                            description={element.description}
                            rating={element.rating}
                            review={element.review}
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