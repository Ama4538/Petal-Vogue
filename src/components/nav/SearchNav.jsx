import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomLink from '../../components/router/CustomLink';
import { useCartInventory, useAllProducts, useSearched, useWishlistInventory } from '../app/Hook.jsx';

function SearchNav({ intoView = null }) {
    // Custom hook
    const { cartAmount } = useCartInventory()
    const { wishlistAmount } = useWishlistInventory();
    const { allProducts } = useAllProducts()
    const { setSearched } = useSearched()

    // States used to manage searching
    const [searchKeyword, setSearchKeyword] = useState("");
    const [visible, setVisible] = useState(false);

    // State used to manage the current sugguestions
    const [content, setcontent] = useState([]);

    // Ref for clicking off the input
    const navSearchRef = useRef(null);
    const navContentRef = useRef(null);

    // Redirect the page if the location of search is not on search page
    const location = useLocation();
    const redirect = useNavigate();

    // Section and category used for searches
    const searchSection = ["women", "men", "kids"]
    const searchCategory = ["sunglasses", "bikinis", "t-shirts", "tank tops", "hoodies", "hats", "rain coats", "shirts", "jackets", "shorts", "swimwears", "sweaters", "crop tops"];

    // Changing the suggestion
    useEffect(() => {
        // All possible searches
        let possibleSearches = allProducts.map(product => product.name).concat(searchSection).concat(searchCategory);
        // Only show unqiue sugguestion
        let filteredSearch = new Set()

        // Added all possible seaches to filterSearched
        possibleSearches.forEach(name => {
            if (name.toLowerCase().includes(searchKeyword.toLowerCase().trim())) {
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

        // Convert set to array
        setcontent([...filteredSearch])
    }, [searchKeyword])

    // Added a mouse listener to document to check if outside has been clicked
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Checking if mouse is clicked outside the search box
    function handleClickOutside(event) {
        if (navSearchRef.current &&
            !navSearchRef.current.contains(event.target) &&
            navContentRef.current &&
            !navContentRef.current.contains(event.target)
        ) {
            setVisible(false);
        }
    };

    // Handled the onpress of enter
    function handleSearch(event) {
        setSearched(searchKeyword);
        // Check if input is empty 
        const notEmpty = searchKeyword.length > 0

        // scroll if into view is viable
        if (intoView !== null && notEmpty) {
            intoView.current.scrollIntoView({ behavior: 'smooth' })
        }

        // Handle redirect
        if (location.pathname !== "/search") {
            redirect("/search")
        }

        // Time out for blur to allow for scroll into view
        if (notEmpty) {
            setVisible(false)
            setTimeout(() => {
                setSearchKeyword("");
                event.target.blur();
            }, 500);
        }
    }

    return (
        <nav className="nav" data-visible={(visible) ? "visible" : "hidden"}>
            <div className="nav__logo-container">
                <CustomLink to="/home" className="nav__logo" />
            </div>
            <div className='nav__search-container'>
                <div className="nav-search__content">
                    <input
                        className='nav__search'
                        type="text"
                        placeholder='Search by keyword'
                        onChange={(event) => { setSearchKeyword(event.target.value) }}
                        onClick={() => { setVisible(true) }}
                        onKeyDown={(event) => { event.key === 'Enter' ? handleSearch(event) : null }}
                        value={searchKeyword}
                        ref={navSearchRef}
                    />
                    <div className='nav-search__display-container' ref={navContentRef}>
                        {/* Prints out all sugguestion */}
                        {content.map((name) => {
                            return (<p key={`${name}Search`} className='nav-search__product-name'>{name}</p>)
                        })}
                    </div>
                </div>
            </div>
            <div className="nav__list nav__list-icon-container">
                <CustomLink to="/search" className="nav__list-icon" />
                <CustomLink
                    to="/wishlist"
                    className="nav__list-icon"
                    dataVisible={wishlistAmount !== 0 ? "visible" : "hidden"}
                    dataAmount={wishlistAmount}
                />
                {/* Manage cart amount display*/}
                <CustomLink
                    to="/cart"
                    className="nav__list-icon"
                    dataVisible={cartAmount !== 0 ? "visible" : "hidden"}
                    dataAmount={cartAmount}
                />
            </div>
        </nav>
    )
}

export default SearchNav