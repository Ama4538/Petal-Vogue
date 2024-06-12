import { useEffect, useRef, useState } from 'react';
import SearchNav from './SearchNav.jsx';
import { motion } from 'framer-motion'
import Product from '../../components/product/Product.jsx';
import DropDown from '../../components/dropdown/DropDown.jsx';
import Marquee from '../../components/marquee/Marquee.jsx';

function Search({ allProducts, setAllProducts, setCartInventory, cartAmount }) {
     // State used to manage current section
    const [activeSection, setActiveSection] = useState("women");
    const [currentDisplay, setCurrentDisplay] = useState(allProducts.filter(product => product.section === "women"))

    // State for sorting and filtering
    const [sortingOrder, setSortingOrder] = useState("Relevance");
    const [category, setcategory] = useState("All");

    // State used to reset dropdowns
    const [resetSortingOrder, setResetSortingOrder] = useState(false)
    const [resetCategory, setResetCategory] = useState(false)

    // State used to handle search function
    const [searched, setSearched] = useState("")

    // Banner text for each section
    const bannerText = {
        women: ["Fashion Finds a New Arc", "A Glimpse Into Modern"],
        men: ["Style Redefined", "Crafting Confidence in Every Thread"],
        kid: ["Fashionable Futures Begin Here", "Discovering the Next Generation of Style Icons"],
        result: ["Elevate Your Style", "Be Bold. Be You. Discover Now"]
    }

    // Filter for each section
    const categoryFilter = {
        women: ["All", "Sunglasses", "Bikinis", "T-shirts", "Tank Tops", "Sweaters"],
        men: ["All", "Hoodies", "Hats", "Rain Coats", "Shirts", "Jackets"],
        kid: ["All", "Shorts", "Jackets", "Swimwears", "Sweaters", "Crop Tops"],
        result: ["All"]
    }

    // Sort by preference
    const sortByFilter = ["Relevance", "Price: Low to High", "Price: High to Low", "Most Reviewed", "Highest Rated"]

    // Marquee text for each section
    const marqueeText = {
        women: "Flash Sale: Up to 50% Off All Women's Fashion at Checkout",
        men: "Flash Sale: Up to 30% Off All Men's Fashion at Checkout",
        kid: "Flash Sale: Up to 25% Off All Kids' Fashion at Checkout",
        result: "Clearance Sale: Up to 70% Off on All Items! Limited Stock!"
    }

    // Ref to slide into view after search
    const contentRef = useRef(null);

    // When category change call needed functions
    useEffect(() => {
        changeCategory()
        // Reset sorting order dropdown menu
        setResetSortingOrder(prev => !prev);
    }, [category])

    // When sorting order change call needed functions
    useEffect(() => {
        // Sort the current display category
        changeSortingOrder()
    }, [sortingOrder])

    // Reset both dropdown menus
    useEffect(() => {
        setResetSortingOrder(prev => !prev);
        setResetCategory(prev => !prev);
    }, [activeSection])

    // Handle search changes
    useEffect(() => {
        // Prevent on mount search
        if (searched !== "") {
            // Gets all product
            setActiveSection("result")
            // Filter all product with the search value
            setCurrentDisplay(allProducts.filter(product => product.name.toLowerCase().includes(searched.toLowerCase())))
        } else {
            // Default seach return
            setActiveSection("women")
        }
    }, [searched])

    // Handles the section changes
    function handleClick(section) {
        setActiveSection(section);
        setCurrentDisplay(allProducts.filter(product => product.section === section));
    }

    // Handle the change in sorting order
    function changeSortingOrder() {
        if (currentDisplay.length === 0) {
            return;
        } else if (sortingOrder.toLowerCase() === "relevance") {
            setCurrentDisplay(prev => prev.slice().sort((a, b) => a.id - b.id));
        } else if (sortingOrder.toLowerCase() === "price: high to low") {
            setCurrentDisplay(prev => prev.slice().sort((a, b) => b.price - a.price));
        } else if (sortingOrder.toLowerCase() === "price: low to high") {
            setCurrentDisplay(prev => prev.slice().sort((a, b) => a.price - b.price));
        } else if (sortingOrder.toLowerCase() === "most reviewed") {
            setCurrentDisplay(prev => prev.slice().sort((a, b) => b.review - a.review));
        } else if (sortingOrder.toLowerCase() === "highest rated") {
            setCurrentDisplay(prev => prev.slice().sort((a, b) => b.rating - a.rating));
        }
    }

    // Handle the change in category order
    function changeCategory() {
        if (category.toLowerCase() === "all") {
            setCurrentDisplay(allProducts.filter(product => product.section === activeSection));
        } else {
            setCurrentDisplay(allProducts.filter(product => product.category === category.toLowerCase()));
        }
    }

    // Handled the onClick of the button
    function handleAddToCart(product) {
        setCartInventory(prev => [...prev, product]);
        // Find the corresponding product and set its button to disabled
        setAllProducts(prevProducts => prevProducts.map(prevProduct => (
            prevProduct.name === product.name ? { ...prevProduct, status: 'disabled' } : prevProduct
        )));

    }

    // Main search Animation
    const searchAnimation = {
        exit: {
            opacity: 0,
            transition: {
                duration: 0.10,
            }
        }
    }

    return (
        <motion.section
            className="search"
            variants={searchAnimation}
            exit="exit"
        >
            <SearchNav
                products={allProducts}
                setSearched={setSearched}
                intoView={contentRef}
                cartAmount={cartAmount}
            />
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
                    <p className="search-dropdown__title">Category:</p>
                    <DropDown content={categoryFilter[activeSection]} setSelected={setcategory} resetCondition={resetCategory} ></DropDown>
                </div>
                <Marquee text={marqueeText[activeSection]}></Marquee>
                <div className="search-content-dropdown-container">
                    <p className="search-dropdown__title">Sort By:</p>
                    <DropDown content={sortByFilter} setSelected={setSortingOrder} resetCondition={resetSortingOrder}></DropDown>
                </div>
            </div>

            {/* Main Content */}
            <section className='search__content' ref={contentRef}>

                {activeSection === "result"
                    ? <h2 className='search-header__title'>{`Results for ${searched}`}</h2>
                    : <h2 className='search-header__title'>{activeSection}</h2>}

                {/* no content */}
                {currentDisplay.length === 0 && (
                    <div className='search-content__none'>
                        <h3 className='search-none__title'> There is No Content Right Now!</h3>
                        <p className='search-none__subtitle'>Come Back Later!</p>
                    </div>
                )}
                <article className='search-content__main'>
                    {/* Display content */}
                    {currentDisplay.map((product) => {
                        return (<Product
                            product={product}
                            handleAddToCart={() => handleAddToCart(product)}
                            key={product.name}
                        />)
                    })}
                </article>
            </section>
        </motion.section>
    )
}

export default Search;