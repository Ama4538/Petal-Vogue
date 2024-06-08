import { useEffect, useState } from 'react';
import Nav from '../../components/nav/Nav.jsx';
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
            <Nav setActiveSection={setActiveSection}></Nav>
            <section className='search__content'>
                <aside className='search-content__side'>
                    <h2 className='search-side__title'>{sectionTitle}</h2>
                </aside>
                <article className='search-content__main'>
                    {currentDisplay.map((element, index) => {
                        return (<Product
                            sectionTitle = {sectionTitle}
                            name = {element.name}
                            price = {element.price}
                            star = {element.star}
                            review = {element.review}
                            image = {element.image} 
                            key={index}
                        />)
                    })}
                </article>
            </section>
        </motion.section>
    )
}

export default Search;