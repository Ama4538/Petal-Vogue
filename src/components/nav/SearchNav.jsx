import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomLink from '../../components/router/CustomLink';
import { useCartInventory, useAllProducts, useSearched } from '../app/Hook.jsx';

function SearchNav({ intoView = null }) {
    // Custom hook
    const { cartAmount } = useCartInventory()
    const { allProducts } = useAllProducts()
    const { setSearched } = useSearched()

    // States used to manage searching
    const [searchKeyword, setSearchKeyword] = useState("");
    const [visible, setVisible] = useState(false);

    // State used to manage the current sugguestions
    const [content, setcontent] = useState(allProducts);

    // Ref for clicking off the input
    const navSearchRef = useRef(null);
    const navContentRef = useRef(null);

    // Redirect the page if the location of search is not on search page
    const location = useLocation();
    const redirect = useNavigate();

    // Changing the suggestion
    useEffect(() => {
        setcontent(allProducts.filter(product => product.name.toLowerCase().includes(searchKeyword.toLowerCase())))
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
        setVisible(false)
        setSearched(searchKeyword);

        // scroll if into view is viable
        if (intoView !== null) {
            intoView.current.scrollIntoView({ behavior: 'smooth' })
        }

        // Handle redirect
        if (location.pathname !== "/search") {
            redirect("/search")
        }

        // Time out for blur to allow for scroll into view
        setTimeout(() => {
            setSearchKeyword("");
            event.target.blur();
        }, 1000);
    }

    return (
        <nav className="nav" data-visible={(visible) ? "visible" : "hidden"}>
            <CustomLink to="/home" className="nav__logo" />
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
                        {content.map((product) => {
                            return (<p key={`${product.name}Search`} className='nav-search__product-name'>{product.name}</p>)
                        })}
                    </div>
                </div>
            </div>
            <ul className="nav__list nav__list-icon-container">
                <CustomLink to="/search" className="nav__list-icon" />
                <CustomLink to="/home" className="nav__list-icon" />
                {/* Manage cart amount display*/}
                <CustomLink
                    to="/cart"
                    className="nav__list-icon"
                    dataVisible={cartAmount !== 0 ? "visible" : "hidden"}
                    dataAmount={cartAmount}
                />
            </ul>
        </nav>
    )
}

export default SearchNav