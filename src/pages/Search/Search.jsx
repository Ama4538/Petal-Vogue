import { useEffect, useRef, useState } from 'react';
import { color, motion } from 'framer-motion'
import { useAllProducts, useCartInventory, useSearched } from "../../components/app/Hook.jsx";
import SearchNav from '../../components/nav/SearchNav.jsx';
import Banner from '../../components/banner/Banner.jsx';
import Product from '../../components/product/Product.jsx';
import DropDown from '../../components/dropdown/DropDown.jsx';
import Marquee from '../../components/marquee/Marquee.jsx';

function Search() {
    // Custom Hooks
    const { allProducts } = useAllProducts();
    const { searched } = useSearched();

    // State used to manage current section
    const [activeSection, setActiveSection] = useState("women");
    const [currentDisplay, setCurrentDisplay] = useState([])

    // State for sorting and filtering
    const [sortingOrder, setSortingOrder] = useState("Relevance");
    const [category, setcategory] = useState("All");

    // State used to reset dropdowns
    const [resetSortingOrder, setResetSortingOrder] = useState(false)
    const [resetCategory, setResetCategory] = useState(false)

    // Banner text for each section
    const bannerText = {
        women: ["Fashion Finds a New Arc", "A Glimpse Into Modern"],
        men: ["Style Redefined", "Crafting Confidence in Every Thread"],
        kids: ["Fashionable Futures Begin Here", "Discovering the Next Generation of Style Icons"],
        result: ["Elevate Your Style", "Be Bold. Be You. Discover Now"]
    }

    // Filter for each section
    const categoryFilter = {
        women: ["All", "Sunglasses", "Bikinis", "T-shirts", "Tank Tops", "Sweaters"],
        men: ["All", "Hoodies", "Hats", "Rain Coats", "Shirts", "Jackets"],
        kids: ["All", "Shorts", "Jackets", "Swimwears", "Sweaters", "Crop Tops"],
        result: ["All"]
    }

    // Sort by preference
    const sortByFilter = ["Relevance", "Price: Low to High", "Price: High to Low", "Most Reviewed", "Highest Rated"]

    // Marquee text for each section
    const marqueeText = {
        women: "Exclusive Sale! Use Code WOMEN20 for 20% Off on Women's Collection!",
        men: "Exclusive Sale! Use Code MEN10 for 10% Off on Men's Collection!",
        kids: "Exclusive Sale! Use Code KIDS15 for 15% Off on Kids' Collection!",
        result: "Explore Our Fashion Collection for Women, Men, and Kids. Discover the Latest Trends, Stylish Outfits, and Must Have Accessories for Every Occasion!"
    }

    // Section and category used for searches
    const searchSection = ["women", "men", "kids"]
    const searchCategory = ["sunglasses", "bikinis", "t-shirts", "tank tops", "hoodies", "hats", "rain coats", "shirts", "jackets", "shorts", "swimwears", "sweaters", "crop tops"];

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
            // Change Section
            setActiveSection("result")
            // All possible searches
            let possibleSearches = allProducts.map(product => product.name).concat(searchSection).concat(searchCategory);
            // Only show unqiue sugguestion
            let filteredSearch = new Set()

            // Added all possible seaches to filterSearched
            possibleSearches.forEach(name => {
                if (name.toLowerCase().includes(searched.toLowerCase().trim())) {
                    filteredSearch.add(name)
                }
            })

            // Check all the current elements in the search and adding their corresponding names
            filteredSearch.forEach(element => {
                if (searchSection.includes(element)) {
                    // Added all section corresponding to the search word
                    allProducts.forEach(product => {
                        product.section === element ? filteredSearch.add(product.name) : null
                    })
                } else if (searchCategory.includes(element)) {
                    // Added all category corresponding to the search word
                    allProducts.forEach(product => {
                        product.category === element ? filteredSearch.add(product.name) : null
                    })
                }
            })

            // Conver set to array
            filteredSearch = [...filteredSearch]
            // Display only products with the name in searched
            setCurrentDisplay(allProducts.filter(product => filteredSearch.includes(product.name)))
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
        // Ensure currentDisplay is not empty
        if (currentDisplay.length === 0) {
            return;
        }

        switch (sortingOrder.toLowerCase()) {
            case 'price: high to low':
                setCurrentDisplay(prev => [...prev].sort((a, b) => b.price - a.price));
                break;
            case 'price: low to high':
                setCurrentDisplay(prev => [...prev].sort((a, b) => a.price - b.price));
                break;
            case 'most reviewed':
                setCurrentDisplay(prev => [...prev].sort((a, b) => b.review - a.review));
                break;
            case 'highest rated':
                setCurrentDisplay(prev => [...prev].sort((a, b) => b.rating - a.rating));
                break;
            default:
                // Default to relevance sorting if order doesn't match
                setCurrentDisplay(prev => [...prev].sort((a, b) => a.id - b.id));
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

    // Main search Animation
    const searchAnimation = {
        exit: {
            opacity: 0,
            transition: {
                duration: 0.15,
            }
        }
    }

    return (
        <motion.section
            className="search"
            variants={searchAnimation}
            exit="exit"
        >
            <SearchNav intoView={contentRef} />
            <div className='search__banner-container'>
                <Banner
                    title={bannerText[activeSection][0]}
                    subtitle={bannerText[activeSection][1]}
                    section={activeSection}
                ></Banner>
            </div>

            {/* Change Section Buttons */}
            <ul className='search__section-selector'>
                {["women", "men", "kids"].map((section) => (
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
                <div className="search-content__dropdown-container">
                    <p className="search-dropdown__title">Category:</p>
                    <DropDown
                        content={categoryFilter[activeSection]}
                        setSelected={setcategory}
                        resetCondition={resetCategory}
                    />
                </div>
                <Marquee text={marqueeText[activeSection]}></Marquee>
                <div className="search-content__dropdown-container">
                    <p className="search-dropdown__title">Sort By:</p>
                    <DropDown
                        content={sortByFilter}
                        setSelected={setSortingOrder}
                        resetCondition={resetSortingOrder}
                    />
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
                    {currentDisplay.map((product) => (
                        <Product
                            product={product}
                            key={product.name} // Assuming 'name' is unique for each product
                        />
                    ))}
                </article>
            </section>
        </motion.section>
    )
}

export default Search;