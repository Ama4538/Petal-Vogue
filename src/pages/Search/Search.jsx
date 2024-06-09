import { useEffect, useState } from 'react';
import SearchNav from '../../components/nav/SearchNav.jsx';
import { motion } from 'framer-motion'
import Product from './Product.jsx';

function Search({ product }) {
    // State used to manage current section
    const [activeSection, setActiveSection] = useState(0)
    const [currentDisplay, setCurrentDisplay] = useState(product.women)
    const [sectionTitle, setSectionTitle] = useState("women");

    useEffect(() => {
        switch (activeSection) {
            case 0:
                setSectionTitle("women");
                setCurrentDisplay(product.women);
                break;
            case 1:
                setSectionTitle("men");
                setCurrentDisplay(product.men);
                break;
            case 2:
                setSectionTitle("kid");
                setCurrentDisplay(product.kid);
                break;
        }
    }, [activeSection])

    function handleClick(section) {
        switch (section) {
            case "women":
                // Changes states based on which buttom is pressed
                setActiveSection(0);
                break;
            case "men":
                setActiveSection(1);
                break;
            case "kid":
                setActiveSection(2);
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
            <ul className='search__section-selector'>
                <button className='search__section-button' onClick={() => handleClick('women')}>Women</button>
                <button className='search__section-button' onClick={() => handleClick('men')}>Men</button>
                <button className='search__section-button' onClick={() => handleClick('kid')}>Kid</button>
            </ul>
            <section className='search__content'>
                <div className='search__header'>
                    <h3 className='search-header__title'>{sectionTitle}</h3>
                </div>
                <article className='search-content__main'>
                    {currentDisplay.map((element, index) => {
                        return (<Product
                            sectionTitle={sectionTitle}
                            name={element.name}
                            price={element.price}
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