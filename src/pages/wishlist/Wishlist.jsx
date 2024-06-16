import { useState } from "react";
import { motion } from "framer-motion"
import { useWishlistInventory } from "../../components/app/Hook";
import SearchNav from "../../components/nav/SearchNav";
import Banner from "../../components/banner/Banner";
import DropDown from '../../components/dropdown/DropDown.jsx';


function Wishlist() {
    // Custom Hook
    const { wishlistInventory, setWishlistInventory, wishlistAmount } = useWishlistInventory()

    // State to manage sorting
    const [sortingOrder, setSortingOrder] = useState("Newly Listed");
    const sortByFilter = ["Newly Listed", "Oldest to Newest"]

    // State to manage the display
    const [currentDisplay, setCurrentDisplay] = useState(wishlistInventory)

    // Main Wishlist Animation
    const wishListAnimation = {
        exit: {
            opacity: 0,
            transition: {
                duration: 0.15,
            }
        }
    }

    return (
        <motion.section
            className="wishlist"
            variants={wishListAnimation}
            exit="exit"
        >
            <SearchNav />
            <article className="wishlist__content-container">
                <div className="wishlist__banner-container">
                    <Banner
                        title={"Your Dream Wardrobe Awaits"}
                        subtitle={"Collect the trends you love"}
                        section={"wishlist"}
                    />

                    {/* Filter Containers */}
                    <h2 className="wishlist__title">Wishlist</h2>
                    <div className="wishlist__filter-container">
                            <p>Results: {wishlistAmount} items</p>
                        <div className="wishlist-filter__dropdown-container">
                            <p className="wishlist-dropdown__title">Sort By:</p>
                            <DropDown
                                content={sortByFilter}
                                setSelected={setSortingOrder} />
                        </div>
                    </div>

                    {/* Display */}
                    <div className="wishlist__display-container">
                        {wishlistAmount > 0 ? 
                        (currentDisplay.map(product => {
                            return (
                                <div className="wishlist-display__product" key={`${product.name}wishlist`}>
                                    <div className="wishlist-product__img-container">
                                        <img
                                            src={`./productimage/${product.section}/${product.image}`}
                                            alt={product.image}
                                            className="wishlist-product__img" />
                                    </div>
                                </div>
                            )
                        }))
                        
                        : 
                        <></>
                        }
                    </div>
                </div>
            </article>
        </motion.section>
    )
}

export default Wishlist