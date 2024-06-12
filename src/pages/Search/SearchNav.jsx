import { motion } from 'framer-motion';
import CustomLink from '../../components/router/CustomLink';
import { useEffect, useRef, useState } from 'react';

function SearchNav({ product, setSearched, intoView }) {
    // All product in system
    const allProduct = [].concat(...Object.values(product));

    // States used to manage searching
    const [searchKeyword, setSearchKeyword] = useState("");
    const [visible, setVisible] = useState(false);
    // State used to manage the current sugguestions
    const [content, setcontent] = useState(allProduct);

    // Ref for clicking off the input
    const navSearchRef = useRef(null);
    const navContentRef = useRef(null);

    // Changing the suggestion
    useEffect(() => {
        setcontent(allProduct.filter(product => product.name.toLowerCase().includes(searchKeyword.toLowerCase())))
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
        intoView.current.scrollIntoView({behavior: 'smooth'})

        // Time out for blur to allow for scroll into view
        setTimeout(() => {
            setSearchKeyword("");
            event.target.blur();
        }, 1000);
    }

    return (
        <motion.nav
            className="nav"
            layoutId="nav"
            data-visible={(visible) ? "visible" : "hidden"}
        >
            <CustomLink to="/home" className="nav__logo" />
            <div className='nav__search-container'>
                <div className="nav-search__content">
                    <input
                        className='nav__search'
                        type="text"
                        placeholder='Search by keyword'
                        onChange={(event) => {
                            setSearchKeyword(event.target.value);
                        }}
                        onClick={() => {
                            setVisible(true);
                        }}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSearch(event);
                            }
                        }}
                        value = {searchKeyword}
                        ref={navSearchRef}
                    />
                    <div className='nav-search__display-container' ref={navContentRef}>
                        {content.map((element, index) => {
                            return (<p key={index} className='nav-search__product-name'>{element.name}</p>)
                        })}
                    </div>
                </div>
            </div>
            <ul className="nav__list nav__list-icon-container">
                <CustomLink to="/search" className="nav__list-icon" />
                <CustomLink to="/home" className="nav__list-icon" />
                <CustomLink to="/home" className="nav__list-icon" />
            </ul>
        </motion.nav>
    )
}

export default SearchNav